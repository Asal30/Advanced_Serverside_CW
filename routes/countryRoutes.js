import express from 'express';
import { getCountryData, getAllCountries } from '../controllers/countryController.js';

const router = express.Router();

router.get('/:name', getCountryData);
router.get('/', getAllCountries);

export default router;
