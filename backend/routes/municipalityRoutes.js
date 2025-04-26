// routes/municipalityRoutes.js
import express from 'express';
import Municipality from '../models/municipality.js';
import Counter from '../models/counter.js';

const router = express.Router();

async function getNextBatchId() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'batch_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

// POST - Add new entry with auto-increment batch_id
router.post('/', async (req, res) => {
  try {
    const { name, location, waste } = req.body;

    console.log("📥 Received data:", req.body);

    const batch_id = await getNextBatchId();

    const entry = new Municipality({ name, location, waste, batch_id });
    await entry.save();

    console.log("✅ Saved to DB:", entry);

    res.status(201).json(entry);
  } catch (error) {
    console.error("❌ Error saving entry:", error);
    res.status(500).json({ error: error.message });
  }
});
// GET - Fetch all entries sorted by batch_id
router.get('/', async (req, res) => {
  try {
    const data = await Municipality.find().sort({ batch_id: 1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});


export default router;
