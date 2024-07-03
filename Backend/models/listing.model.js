// // import mongoose from 'mongoose';

// // const listingSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: true,
// //     },
// //     description: {
// //         type: String,
// //         required: true,
// //     },
// //     address: {
// //         type: String,
// //         required: true,
// //     },
// //     regularPrice: {
// //         type: Number,
// //         required: true,
// //     },
// //     discountPrice: {
// //         type: Number,
// //         required: true,
// //     },
// //     bathrooms: {
// //         type: Number,
// //         required: true,
// //     },
// //     bedrooms: {
// //         type: Number,
// //         required: true,
// //     },
// //     savings: {
// //         type: String,
// //         required: true
// //     },
// //     features: [{
// //         type: String
// //     }],
// //     furnished: {
// //         type: Boolean,
// //         required: true,
// //     },
// //     website: {
// //         type: String,
// //         required: true
// //     },
// //     parking: {
// //         type: Boolean,
// //         required: true,
// //     },
// //     type: {
// //         type: String,
// //         required: true,
// //     },
// //     offer: {
// //         type: Boolean,
// //         required: true,
// //     },
// //     imageUrls: {
// //         type: Array,
// //         required: true,
// //     },
// //     userRef: {
// //         type: String,
// //         required: true,
// //     },
// // }, { timestamps: true });

// // const Listing = mongoose.model('Listing', listingSchema);

// // export default Listing;


import mongoose from 'mongoose';

const { Schema } = mongoose;

const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    savings: {
        type: String,
        required: true,
    },
    features: [{
        type: String,
    }],
    website: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: [String],
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
    cashbackOffer: {
        type: String,
        required: true,
    },
    serviceProviders: [{
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        services: [{ type: String }],
        description: { type: String, required: true },
        link: { type: String, required: true },
    }],
    eligibilityRequirements: [{
        type: String,
    }],
    benefits: [{
        type: String,
    }],
    tags: [{
        type: String,
    }],
    discountTitle: {
        type: String,
        required: true,
    },
    discountDescription: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;