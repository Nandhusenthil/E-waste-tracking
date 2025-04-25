// models/Municipality.js
import mongoose from 'mongoose';

const municipalitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    waste: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt fields
  }
);

const Municipality = mongoose.model('Municipality', municipalitySchema);

export default Municipality;
