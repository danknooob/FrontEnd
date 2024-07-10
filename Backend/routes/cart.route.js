import express from 'express';
import { addToCart, addToFavorites, getCart, removeFromCart, removeFromFavorites } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-to-cart', verifyToken, addToCart);
router.post('/add-to-favorites', verifyToken, addToFavorites);
router.post('/remove-from-cart', verifyToken, removeFromCart);
router.post('/remove-from-favorites', verifyToken, removeFromFavorites);
router.get('/getcart/:userId', verifyToken, getCart)

export default router;