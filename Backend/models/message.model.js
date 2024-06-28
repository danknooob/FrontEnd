import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Message = mongoose.model('Message', messageSchema);

export default Message;