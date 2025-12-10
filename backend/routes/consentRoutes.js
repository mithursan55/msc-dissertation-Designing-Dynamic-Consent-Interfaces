import express from 'express';
import { body } from 'express-validator';
import { getConsents, updateConsents, getConsentHistory } from '../controllers/consentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownershipMiddleware from '../middleware/ownershipMiddleware.js';

const router = express.Router();

const updateConsentValidation = [
    body('categories.personalInformation').optional().isInt({ min: 0, max: 100 }),
    body('categories.locationData').optional().isInt({ min: 0, max: 100 }),
    body('categories.usageAnalytics').optional().isInt({ min: 0, max: 100 }),
    body('categories.marketingCommunications').optional().isInt({ min: 0, max: 100 }),
    body('categories.thirdPartySharing').optional().isInt({ min: 0, max: 100 })
];

router.use(authMiddleware);
router.use(ownershipMiddleware);

router.get('/', getConsents);
router.put('/', updateConsentValidation, updateConsents);
router.get('/history', getConsentHistory);

export default router;
