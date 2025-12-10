import express from 'express';
import { getUserHistory, exportUserHistory } from '../controllers/historyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownershipMiddleware from '../middleware/ownershipMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(ownershipMiddleware);

router.get('/:userId', getUserHistory);
router.get('/:userId/export', exportUserHistory);

export default router;
