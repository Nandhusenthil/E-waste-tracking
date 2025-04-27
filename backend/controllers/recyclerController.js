import Recycler from '../models/recycler.js';
import Municipality from '../models/municipality.js';

// Fetch new batch IDs (for notification)
export const getNewMunicipalityBatchIds = async (req, res) => {
  try {
    const recyclerBatches = await Recycler.find({}, 'batch_id');
    const processedBatchIds = recyclerBatches.map(b => b.batch_id);

    const unprocessedBatches = await Municipality.find({
      batch_id: { $nin: processedBatchIds },
    });

    res.status(200).json(unprocessedBatches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch new municipality batch IDs', error: err.message });
  }
};

// Usual create entry
export const createRecyclerEntry = async (req, res) => {
  try {
    console.log('Received Data:', req.body); 
    const newEntry = new Recycler(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create recycler entry', error: err.message });
  }
};

// Usual fetch all recycler entries
export const getAllRecyclerEntries = async (req, res) => {
  try {
    const entries = await Recycler.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recycler entries', error: err.message });
  }
};
