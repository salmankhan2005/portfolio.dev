'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { personalData } from '@/utils/data/personal-data';
import { generateResponse } from '../../utils/gemini';
import '@/app/styles/globals.css';

// Animation paths
const animations = {
  'robot': '/animations/robot.json',
  'typing': '/animations/typing.json',
  'message': '/animations/message.json',
  'ethereum': '/animations/ethereum.json',
  'blockchain': '/animations/blockchain.json',
  'nft': '/animations/nft.json',
  'defi': '/animations/defi.json',
  'wallet': '/animations/wallet.json'
};

// Dynamically import LottieAnimation component
const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
  ssr: false,
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
});

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState('robot');
  const [isMinimized, setIsMinimized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: `Hi! I'm ${personalData.name}'s AI assistant. I can tell you about my creator's skills, experience, and projects. What would you like to know?`,
        isUser: false
      };
      setMessages([welcomeMessage]);
      setCurrentAnimation('robot');
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // Add user message
      const userMessage = { text: input, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setCurrentAnimation('typing');

      // Generate response using Gemini API
      const response = await generateResponse(input);

      // Add bot response
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
      setCurrentAnimation(getContextAnimation(input));

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setIsTyping(false);
      setCurrentAnimation('error');
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I couldn't process your request. Please try asking your question again.", 
        isUser: false 
      }]);
    }
  };

  const getContextAnimation = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Define context categories and their related keywords
    const contexts = {
      skills: {
        keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'expertise', 'proficient', 'know'],
        animation: 'blockchain'
      },
      projects: {
        keywords: ['project', 'work', 'build', 'create', 'develop', 'portfolio', 'application', 'app', 'website', 'system'],
        animation: 'nft'
      },
      experience: {
        keywords: ['experience', 'job', 'work', 'role', 'position', 'career', 'professional', 'employment'],
        animation: 'defi'
      },
      education: {
        keywords: ['education', 'study', 'school', 'college', 'university', 'degree', 'course', 'learn', 'academic'],
        animation: 'smart-contract'
      },
      contact: {
        keywords: ['contact', 'reach', 'email', 'linkedin', 'github', 'connect', 'message', 'social'],
        animation: 'wallet'
      }
    };

    // Find the most relevant context based on keyword matches
    let bestMatch = { context: 'general', score: 0 };
    
    Object.entries(contexts).forEach(([context, config]) => {
      const score = config.keywords.reduce((acc, keyword) => {
        return acc + (lowerQuery.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > bestMatch.score) {
        bestMatch = { context, score };
      }
    });

    return contexts[bestMatch.context]?.animation || 'message';
  };

  const handleAnimationError = () => {
    console.error('Animation failed to load');
    // Fallback to a simple icon if animation fails
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
    );
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={toggleChat}
          className="bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-full p-3 shadow-lg transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle chat"
        >
          <div className="w-8 h-8">
            <LottieAnimation
              animationPath={isOpen ? animations.message : animations.robot}
              loop={true}
              autoplay={true}
              onError={handleAnimationError}
            />
          </div>
        </button>
        {isOpen && (
          <div className={`absolute bottom-16 left-0 w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[400px]'}`}>
            <div className="bg-[#6B46C1] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8">
                  <LottieAnimation
                    animationPath={animations[currentAnimation]}
                    loop={true}
                    autoplay={true}
                    onError={handleAnimationError}
                  />
                </div>
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesEndRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-[#6B46C1] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                      <div className="w-8 h-8">
                        <LottieAnimation
                          animationPath={animations.typing}
                          loop={true}
                          autoplay={true}
                          onError={handleAnimationError}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!isMinimized && (
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my creator..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot; 