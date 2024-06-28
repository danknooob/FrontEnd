import express from 'express';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import { verifyToken } from '../utils/verifyUser.js'; // Import the verifyToken middleware

const router = express.Router();

// Get all chats for an authenticated user
router.get('/', verifyToken, async(req, res) => {
    try {
        const chats = await Chat.find({ users: req.user._id })
            .populate('users', 'username')
            .populate('lastMessage');

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a specific chat by chat ID
router.get('/:chatId', verifyToken, async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('users', 'username')
            .populate('lastMessage');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add a new chat
router.post('/', verifyToken, async(req, res) => {
    const { userIds } = req.body; // userIds is an array of user IDs

    try {
        let chat = await Chat.findOne({ users: { $all: userIds } });

        if (!chat) {
            chat = new Chat({ users: userIds });
            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Mark a chat as read
router.patch('/:chatId/read', verifyToken, async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Assuming we have a field to track if a chat is read
        chat.isRead = true;
        await chat.save();

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;