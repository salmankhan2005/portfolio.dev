import { GoogleGenAI } from '@google/genai';
import { personalData } from '@/utils/data/personal-data';

// API Key configuration
const API_KEY = 'AIzaSyBAs21kB3mlkgah7Ab7zQU6IHvwWHi71t8'; // Direct API key for testing

// Debug logging
console.log('API Key status:', API_KEY ? 'Present' : 'Missing');

export async function generateResponse(userInput) {
  try {
    if (!API_KEY) {
      console.error('API key is missing');
      throw new Error('API key not configured');
    }

    console.log('Initializing Gemini API with key:', API_KEY.substring(0, 5) + '...');
    
    // Initialize the API client
    const genAI = new GoogleGenAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a simple prompt with personal data
    const prompt = `
      You are ${personalData.name}'s AI assistant. Use this information to answer the question:
      
      Name: ${personalData.name}
      Skills: ${personalData.skills?.join(', ') || 'Not specified'}
      Projects: ${personalData.projects?.map(p => p.title).join(', ') || 'Not specified'}
      Experience: ${personalData.experience?.map(e => e.role).join(', ') || 'Not specified'}
      Education: ${personalData.education?.degree || 'Not specified'} at ${personalData.education?.institution || 'Not specified'}
      Contact: Email: ${personalData.email || 'Not specified'}, LinkedIn: ${personalData.linkedin || 'Not specified'}, GitHub: ${personalData.github || 'Not specified'}

      Question: ${userInput}

      Guidelines:
      - Keep response under 200 characters
      - Only use the information provided above
      - Be professional and friendly
      - If information is not available, say so
      - Always provide a response, even if it's to say you don't have that information
    `;

    console.log('Sending prompt to Gemini:', prompt);

    try {
      // Generate response with safety settings
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      });

      console.log('Received response from Gemini:', result);

      if (!result || !result.response) {
        console.error('No response from Gemini API');
        throw new Error('No response from API');
      }

      const response = result.response.text();
      console.log('Processed response:', response);

      if (!response || response.trim() === '') {
        throw new Error('Empty response from API');
      }

      return response;
    } catch (apiError) {
      console.error('API Error:', apiError);
      if (apiError.message) {
        console.error('API Error Message:', apiError.message);
      }
      if (apiError.stack) {
        console.error('API Error Stack:', apiError.stack);
      }
      throw apiError;
    }
  } catch (error) {
    console.error('Error in generateResponse:', error);
    
    // Log the full error details
    if (error.response) {
      console.error('API Response:', error.response);
    }
    if (error.message) {
      console.error('Error Message:', error.message);
    }
    if (error.stack) {
      console.error('Error Stack:', error.stack);
    }

    if (error.message.includes('API key')) {
      return "I'm sorry, but I'm currently unable to process your request due to a configuration issue. Please make sure the API key is properly set in the environment variables.";
    }

    // Return a more specific error message based on the error type
    if (error.message.includes('network')) {
      return "I'm sorry, I'm having trouble connecting to the server. Please check your internet connection and try again.";
    }

    if (error.message.includes('timeout')) {
      return "I'm sorry, the request took too long to process. Please try again in a moment.";
    }

    if (error.message.includes('quota')) {
      return "I'm sorry, I've reached my usage limit. Please try again later.";
    }

    // Return a more specific error message
    return "I'm sorry, I encountered an error while processing your request. Please try asking your question again in a different way.";
  }
} 