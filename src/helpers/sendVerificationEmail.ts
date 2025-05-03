import sgMail from '@sendgrid/mail';
import { ApiResponse } from '@/types/ApiResponse';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2>Hi ${username},</h2>
      <p>Thanks for signing up on <strong>Quiet Link</strong>!</p>
      <p>Your OTP verification code is:</p>
      <h3 style="color: #000;">${verifyCode}</h3>
      <p>This code is valid for 10 minutes. If you didn’t request it, just ignore this email.</p>
      <p style="font-size: 12px; color: gray;">Sent by Quiet Link - <a href="https://anonymous-messenger-ten.vercel.app/">QuietLink.com</a></p>
</div>

    `;

    await sgMail.send({
      to: email,
      from: 'chanchalrathore111003@gmail.com', // Your verified sender email
      subject: 'Quiet Link Verification Code',
      html: emailHtml,
    });

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
