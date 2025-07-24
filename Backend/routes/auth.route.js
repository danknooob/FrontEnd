import express from 'express';
import { google, signOut, signin, signup, signedInUserId } from '../controllers/auth.controller.js';
// import { signedInUserId } from '../controllers/auth.js';
const router = express.Router();

router.post('/register', signup);
router.post('/login', signin);
router.post('/google', google);
router.get('/signout', signOut);
router.get('/signedinuserid', signedInUserId);

export default router;