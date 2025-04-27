import express from 'express';
import { createRecyclerEntry, getAllRecyclerEntries, getNewMunicipalityBatchIds } from '../controllers/recyclerController.js';

const router = express.Router();

router.post('/', createRecyclerEntry);
router.get('/', getAllRecyclerEntries);

// 🚨 New endpoint for fetching notification batch IDs
router.get('/new-batches', getNewMunicipalityBatchIds);

export default router;
