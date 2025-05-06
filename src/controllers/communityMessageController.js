import CommunityMessage from '../models/CommunityMessage.js';

// GET all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await CommunityMessage.find().sort({ sentAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// POST a new message
export const sendMessage = async (req, res) => {
  const { senderName, message } = req.body;

  if (!senderName || !message) {
    return res.status(400).json({ error: 'senderName and message are required' });
  }

  try {
    const newMessage = new CommunityMessage({ senderName, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
