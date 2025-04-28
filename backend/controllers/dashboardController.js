import Municipality from '../models/municipality.js';
import Recycler from '../models/recycler.js';
import mongoose from 'mongoose';

// Utility to get month name
const getMonthName = (date) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[new Date(date).getMonth()];
};

// --- 1. Controller for Home Page (City-wise data month-wise) ---
export const getCityWasteData = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City query parameter is required." });
  }

  try {
    // Find batch_ids from Municipality based on city
    const cityMunicipalityEntries = await Municipality.find({ location: city });

    const batchIds = cityMunicipalityEntries.map(entry => entry.batch_id);

    // Find matching recycler entries
    const recyclerEntries = await Recycler.find({ batch_id: { $in: batchIds } });

    const monthData = {};

    recyclerEntries.forEach(entry => {
      const month = getMonthName(entry.createdAt);
      monthData[month] = (monthData[month] || 0) + entry.recycled_weight;
    });

    const response = Object.keys(monthData).map(month => ({
      month,
      e_waste_handled: monthData[month]
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city waste data', error: error.message });
  }
};

// --- 2. Controller for Overview Page (Sum Generated vs Handled month-wise) ---
export const getOverviewReport = async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    const recyclers = await Recycler.find();

    const monthlyData = {};

    municipalities.forEach(entry => {
      const month = getMonthName(entry.createdAt);
      if (!monthlyData[month]) {
        monthlyData[month] = { generated: 0, handled: 0 };
      }
      monthlyData[month].generated += entry.waste;
    });

    recyclers.forEach(entry => {
      const month = getMonthName(entry.createdAt);
      if (!monthlyData[month]) {
        monthlyData[month] = { generated: 0, handled: 0 };
      }
      monthlyData[month].handled += entry.recycled_weight;
    });

    const response = Object.keys(monthlyData).map(month => ({
      month,
      e_waste_generated: monthlyData[month].generated,
      e_waste_handled: monthlyData[month].handled
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overview report', error: error.message });
  }
};
