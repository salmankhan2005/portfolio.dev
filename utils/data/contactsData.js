export const contactsData = {
  email: 'samitha0786@gmail.com',
  phone: '+91 9342298949',
  address: '128,Srinivasapuram Extension Bhavani, Tamil nadu-638301',
  github: 'https://github.com/salmankhan2005',
  linkedIn: 'www.linkedin.com/in/salmankhan2005',
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Try to send Telegram message if credentials are present
    let telegramSuccess = false;
    if (token && chat_id) {
      telegramSuccess = await sendTelegramMessage(token, chat_id, message);
    }

    // Always try to send email
    const emailSuccess = await sendEmail(payload, message);

    if (emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message and email sent successfully!',
        telegram: telegramSuccess
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send email.',
      telegram: telegramSuccess
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
}