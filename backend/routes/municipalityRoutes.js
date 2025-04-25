// routes/municipalityRoutes.js
import express from 'express';
import Municipality from '../models/municipality.js';

const router = express.Router();

// POST - Add new entry
router.post('/', async (req, res) => {
  try {
    const { name, location, waste } = req.body;

    console.log("📥 Received data:", req.body); // Debug log

    const entry = new Municipality({ name, location, waste });
    await entry.save();

    console.log("✅ Saved to DB:", entry); // Debug log

    res.status(201).json(entry);
  } catch (error) {
    console.error("❌ Error saving entry:", error); // Debug error
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch all entries
router.get('/', async (req, res) => {
  try {
    const data = await Municipality.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error); // Debug error
    res.status(500).json({ error: error.message });
  }
});

export default router;
