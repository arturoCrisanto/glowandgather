// Email service helper functions
// To use this, you'll need to install and configure an email service like Resend

// Installation: npm install resend
// Then set RESEND_API_KEY in your .env file

export async function sendContactConfirmationEmail(
  customerEmail: string,
  customerName: string
) {
  // TODO: Implement with your email service (Resend, Nodemailer, etc.)

  // Example with Resend:
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);

  // await resend.emails.send({
  //   from: 'Glow and Gather <noreply@glowandgather.com>',
  //   to: customerEmail,
  //   subject: 'Thank you for contacting us!',
  //   html: `
  //     <h1>Hello ${customerName}!</h1>
  //     <p>Thank you for reaching out to Glow and Gather.</p>
  //     <p>We've received your message and will get back to you as soon as possible.</p>
  //     <p>Best regards,<br/>The Glow and Gather Team</p>
  //   `
  // });

  console.log(`Email would be sent to: ${customerEmail}`);
}

export async function sendAdminNotificationEmail(
  customerName: string,
  customerEmail: string,
  subject: string,
  message: string
) {
  // TODO: Implement with your email service

  // Example with Resend:
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);

  // await resend.emails.send({
  //   from: 'Glow and Gather <noreply@glowandgather.com>',
  //   to: 'admin@glowandgather.com',
  //   subject: `New Contact Form: ${subject}`,
  //   html: `
  //     <h2>New Contact Form Submission</h2>
  //     <p><strong>From:</strong> ${customerName} (${customerEmail})</p>
  //     <p><strong>Subject:</strong> ${subject}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${message}</p>
  //   `
  // });

  console.log(
    `Admin notification would be sent for message from: ${customerEmail}`
  );
}

// Instructions to setup email service:
// 1. Install Resend: npm install resend
// 2. Sign up at https://resend.com and get your API key
// 3. Add RESEND_API_KEY to your .env file
// 4. Verify your domain or use a resend.dev address for testing
// 5. Uncomment the code above and remove console.log statements
