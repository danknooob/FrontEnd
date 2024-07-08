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


// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const listingSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
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
//     savings: {
//         type: String,
//         required: true,
//     },
//     features: [{
//         type: String,
//     }],
//     website: {
//         type: String,
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
//         type: [String],
//         required: true,
//     },
//     userRef: {
//         type: String,
//         required: true,
//     },
//     cashbackOffer: {
//         type: String,
//         required: true,
//     },
//     serviceProviders: [{
//         name: { type: String, required: true },
//         imageUrl: { type: String, required: true },
//         services: [{ type: String }],
//         description: { type: String, required: true },
//         link: { type: String, required: true },
//     }],
//     eligibilityRequirements: [{
//         type: String,
//     }],
//     benefits: [{
//         type: String,
//     }],
//     tags: [{
//         type: String,
//     }],
//     discountTitle: {
//         type: String,
//         required: true,
//     },
//     discountDescription: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// const Listing = mongoose.model('Listing', listingSchema);

// export default Listing;


import mongoose from 'mongoose';

const { Schema } = mongoose;

const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
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
    // features: [{
    //     featureId: { type: String },
    //     name: { type: String, required: true },
    //     description: { type: String, required: true },
    // }],
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
        type: Array,
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
        imageUrls: {
            type: Array,
            required: true
        },
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
        required: true,
    }],
    discountTitle: {
        type: String,
        required: true,
    },
    discountDescription: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
        trim: true,
        enum: [
            "Accounting",
            "Business Intelligence (BI)",
            "Collaboration",
            "Communication",
            "Content Management System (CMS)",
            "CRM (Customer Relationship Management)",
            "Customer Support",
            "Cybersecurity",
            "Design",
            "Dev Tools (Development Tools)",
            "eCommerce",
            "Enterprise Resource Planning (ERP)",
            "Finance",
            "HR, Recruiting (Human Resources, Recruiting)",
            "Help Desk / Ticketing",
            "Inventory Management",
            "Legal, Compliance",
            "Marketing",
            "Admin (Administrative Tools)",
            "Partner Management",
            "Photo, Video",
            "Point of Sale (POS)",
            "Productivity",
            "Project Management",
            "Sales, Lead Generation",
            "SCM (Supply Chain Management)",
            "Social Media",
            "Software Testing",
            "Task Management",
            "Time Tracking / Timesheet",
            "Website Builders"
        ],
    },
    // pricing: {
    //     price: {
    //         type: String,
    //         required: true,
    //     },
    //     currency: {
    //         type: String,
    //         required: true,
    //     },
    //     billing_frequency: {
    //         type: String,
    //         enum: ["Weekly", "Monthly", "Annually"],
    //         required: true,
    //     }
    // },
    // discounts: [{
    //     discountId: { type: String, required: true },
    //     description: { type: String, required: true },
    //     amount: { type: Number, required: true },
    //     validFrom: { type: Date, required: true },
    //     validTo: { type: Date, required: true }
    // }],
    version: {
        type: String,
        // required: true,
    },
    platforms: [{
        type: String,
        // required: true,
        enum: ["Web", "iOS", "Android"]
    }],
    // requirements: {
    //     type: String,
    // },
    integrations: [{
        type: String,
        // required: true,
    }],
    // provider_information: {
    //     provider_id: {
    //         type: String,
    //         required: true,
    //         trim: true,
    //     },
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     contact: {
    //         type: String,
    //         required: true,
    //     }
    // },
    legal: {
        termsOfService: {
            type: String,
            //  required: true 
        },
        privacyPolicy: {
            type: String,
            //  required: true 
        }
    },
    // media: {
    //     images: [{ type: String }],
    //     videos: [{ type: String }]
    // },
    availability: {
        status: {
            type: String,
            // required: true
        },
        releaseDate: {
            type: Date,
            // required: true 
        }
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;