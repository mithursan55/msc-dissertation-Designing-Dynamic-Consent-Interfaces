import express from 'express';
import { body } from 'express-validator';
import { getUserConsents, postUserConsent } from '../controllers/consentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownershipMiddleware from '../middleware/ownershipMiddleware.js';

const router = express.Router();

const updateValidation = [
    body('dataCategory').notEmpty().withMessage('Data category is required'),
    body('newLevel').isInt({ min: 0, max: 3 }).withMessage('Level must be 0, 1, 2, or 3')
];

router.use(authMiddleware);
router.use(ownershipMiddleware);

router.get('/:userId', getUserConsents);
router.post('/:userId', updateValidation, postUserConsent);

export default router;
