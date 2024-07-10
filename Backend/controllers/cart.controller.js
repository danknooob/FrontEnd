import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const addToCart = async(req, res) => {
    try {
        const { listingId, userId } = req.body;
        // Validate the listing ID
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        // Update the user's cart
        const updatedUser = await User.findByIdAndUpdate(
            userId, { $addToSet: { cart: listingId } }, // Add to the cart array if not already present
            { new: true } // Return the updated document
        ).populate('cart');
        console.log('User ID:', userId);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // res.status(200).json(updatedUser.cart);
        res.send({
            message: 'Item added to cart',
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};


export const addToFavorites = async(req, res) => {
    try {
        const { listingId } = req.body;

        // Validate the listing ID
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Update the user's favorites
        const user = await User.findByIdAndUpdate(
            req.user._id, { $addToSet: { favorites: listingId } }, { new: true }
        ).populate('favorites');

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async(req, res) => {
    try {
        const { listingId, userId } = req.body;

        // Update the user's cart
        const user = await User.findByIdAndUpdate(
            userId, { $pull: { cart: listingId } }, { new: true }
        ).populate('cart');

        // res.status(200).json(user.cart);
        res.send({
            message: 'Item removed from cart',
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromFavorites = async(req, res) => {
    try {
        const { listingId } = req.body;

        // Update the user's favorites
        const user = await User.findByIdAndUpdate(
            req.user._id, { $pull: { favorites: listingId } }, { new: true }
        ).populate('favorites');

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};