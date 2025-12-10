import express from 'express';
import { body } from 'express-validator';
import { signup, login, getCurrentUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


const signupValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
