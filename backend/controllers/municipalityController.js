import Municipality from '../models/municipality.js';

export const createEntry = async (req, res) => {
  try {
    const newEntry = new Municipality(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create entry', error: err.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const entries = await Municipality.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries', error: err.message });
  }
};
