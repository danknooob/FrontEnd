import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;