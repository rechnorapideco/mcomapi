import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpiresAt: Date,
});

export default mongoose.model('User', userSchema);
