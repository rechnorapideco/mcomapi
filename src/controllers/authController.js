import User from '../models/User.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Request OTP
export const requestOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
  }

  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  user.verified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  res.status(200).json({ message: 'OTP verified. User authenticated.', user });
};
