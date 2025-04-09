import express from 'express';
import { getCountryData } from '../controllers/countryController.js';
import { authenticate, checkApiKey } from '../authMiddleware.js';

const router = express.Router();

router.get('/:name', authenticate, getCountryData);

export default router;