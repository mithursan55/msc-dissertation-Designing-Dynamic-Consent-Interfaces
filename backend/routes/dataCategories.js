import express from 'express';
import { getDataCategories } from '../controllers/dataCategoryController.js';

const router = express.Router();

router.get('/', getDataCategories);

export default router;
