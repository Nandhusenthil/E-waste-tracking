import express from 'express';
import { getCityWasteData, getOverviewReport } from '../controllers/dashboardController.js';

const router = express.Router();

// Route for home page (city filter + line graph)
router.get('/city-data', getCityWasteData);

// Route for overview report page (summary table)
router.get('/overview', getOverviewReport);

export default router;
