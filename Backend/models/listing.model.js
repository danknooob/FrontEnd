// import mongoose from 'mongoose';

// const listingSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     regularPrice: {
//         type: Number,
//         required: true,
//     },
//     discountPrice: {
//         type: Number,
//         required: true,
//     },
//     bathrooms: {
//         type: Number,
//         required: true,
//     },
//     bedrooms: {
//         type: Number,
//         required: true,
//     },
//     furnished: {
//         type: Boolean,
//         required: true,
//     },
//     parking: {
//         type: Boolean,
//         required: true,
//     },
//     type: {
//         type: String,
//         required: true,
//     },
//     offer: {
//         type: Boolean,
//         required: true,
//     },
//     imageUrls: {
//         type: Array,
//         required: true,
//     },
//     userRef: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// const Listing = mongoose.model('Listing', listingSchema);

// export default Listing;


// user schema for ourproject 
import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Software', 'Tools', 'Courses', 'Services', 'Books', 'Other'],
        required: true,
    },
    benefits: {
        type: [String],
        required: true,
    },
    dealType: {
        type: String,
        enum: ['Lifetime Deal', 'Yearly Subscription', 'Monthly Subscription'],
        required: true,
    },
    availability: {
        type: String,
        enum: ['Available', 'Expired', 'Coming Soon'],
        default: 'Available',
    },
    dealUrl: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;