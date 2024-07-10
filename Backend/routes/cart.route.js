import express from 'express';
import { addToCart, addToFavorites, removeFromCart, removeFromFavorites } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-to-cart', verifyToken, addToCart);
router.post('/add-to-favorites', verifyToken, addToFavorites);
router.post('/remove-from-cart', verifyToken, removeFromCart);
router.post('/remove-from-favorites', verifyToken, removeFromFavorites);

export default router;