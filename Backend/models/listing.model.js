import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    creditAmount: {
        type: String,
        required: true,
    },
    savingsAmount: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;