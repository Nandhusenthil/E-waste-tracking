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
    batch_id: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Municipality = mongoose.model('Municipality', municipalitySchema);

export default Municipality;
