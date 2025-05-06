import mongoose from 'mongoose';

const communityMessageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CommunityMessage', communityMessageSchema);
