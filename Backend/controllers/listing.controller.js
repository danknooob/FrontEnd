import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new listing
export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

// Delete a listing
export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

// Update a listing
export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

// Get a single listing
export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

// Get multiple listings
export const getListings = async(req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const type = req.query.type || ''; // Get type from query parameters

        const query = {
            name: { $regex: searchTerm, $options: 'i' },
            availability: 'Available', // Consider only available listings
        };

        if (type) {
            query.type = type; // Add type to query if provided
        }

        const listings = await Listing.find(query)
            .sort({ createdAt: 'desc' })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};