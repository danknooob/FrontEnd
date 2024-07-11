import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const addToCart = async(req, res) => {
    try {
        const { listingId, userId, quantity } = req.body;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the listing is already in the cart
        const cartItemIndex = user.cart.findIndex(item => item.listingId.equals(listingId));

        if (cartItemIndex !== -1) {
            // If listing already exists in the cart, update quantity
            user.cart[cartItemIndex].quantity += 1;
        } else {
            // If listing does not exist in the cart, add it
            user.cart.push({ listingId: listingId, quantity: quantity });
        }

        await user.save();

        res.send({
            message: "added to cart",
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Failed to add to cart' });
    }
};
export const removeFromCart = async(req, res) => {
    try {
        const { listingId, userId, quantity } = req.body;

        // Update the user's cart
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const cartItemIndex = user.cart.findIndex(item => item.listingId.equals(listingId));

        if (cartItemIndex !== 0) {
            // If listing already exists in the cart, update quantity
            user.cart[cartItemIndex].quantity -= 1;
        } else if (cartItemIndex === 0) {
            user.cart = user.cart.filter(item => !item.productId.equals(listingId));
        }

        await user.save();

        res.send({
            message: "removed from cart"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToFavorites = async(req, res) => {
    try {
        const { listingId, userId } = req.body;

        // Validate the listing ID
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Update the user's favorites
        const user = await User.findByIdAndUpdate(
            userId, { $addToSet: { favorites: listingId } }, { new: true }
        ).populate('favorites');

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromFavorites = async(req, res) => {
    try {
        const { listingId, userId } = req.body;

        // Update the user's favorites
        const user = await User.findByIdAndUpdate(
            userId, { $pull: { favorites: listingId } }, { new: true }
        ).populate('favorites');

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCart = async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate({
            path: 'cart.listingId',
            select: 'name discountPrice imageUrls',
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        const cartItems = user.cart.map(item => {
            if (!item.listingId) {
                return null; // Handle cases where listingId is not defined
            }

            return {
                listingId: item.listingId._id,
                name: item.listingId.name,
                quantity: item.quantity,
                discountPrice: item.listingId.discountPrice,
                imageUrls: item.listingId.imageUrls,
            };
        }).filter(item => item !== null); // Filter out null items

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteCartItem = async(req, res) => {
    try {
        const { listingId, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the listing from the cart
        user.cart = user.cart.filter(item => !item.listingId.equals(listingId));

        await user.save();

        res.send({
            message: "Listing removed from cart"
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Failed to remove from cart' });
    }
};
export const buyProduct = async(req, res) => {
    try {
        const { listingId, userId, quantity } = req.body;

        // Validate the listing ID
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Update user's products array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the listing is already in user's products
        const productIndex = user.products.findIndex(item => item.listingId.equals(listingId));

        if (productIndex !== -1) {
            // If listing already exists in products, update quantity
            user.products[productIndex].quantity += quantity;
        } else {
            // If listing does not exist in products, add it
            user.products.push({ listingId: listingId, quantity: quantity });
        }

        await user.save();

        res.status(200).json({ message: 'Product purchased successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const buyCart = async(req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user with populated cart
        const user = await User.findById(userId).populate('cart.listingId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Loop through user's cart and process each item
        for (let item of user.cart) {
            const listingId = item.listingId._id;
            const quantity = item.quantity;

            // Validate the listing ID
            const listing = await Listing.findById(listingId);
            if (!listing) {
                return res.status(404).json({ message: `Listing with ID ${listingId} not found` });
            }

            // Update user's products array with cart items
            const productIndex = user.products.findIndex(prod => prod.listingId.equals(listingId));

            if (productIndex !== -1) {
                // If listing already exists in products, update quantity
                user.products[productIndex].quantity += quantity;
            } else {
                // If listing does not exist in products, add it
                user.products.push({ listingId: listingId, quantity: quantity });
            }
        }

        // Clear user's cart after purchasing
        user.cart = [];

        await user.save();

        res.status(200).json({ message: 'Cart purchased successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getPurchasedProducts = async(req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user and populate the products
        const user = await User.findById(userId).populate({
            path: 'products.listingId',
            select: 'name discountPrice imageUrls',
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract relevant information from user's products
        const purchasedProducts = user.products.map(item => ({
            listingId: item.listingId._id,
            name: item.listingId.name,
            quantity: item.quantity,
            discountPrice: item.listingId.discountPrice,
            imageUrls: item.listingId.imageUrls,
        }));

        res.status(200).json(purchasedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};