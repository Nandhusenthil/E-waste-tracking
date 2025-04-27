import mongoose from 'mongoose';

const recyclerSchema = new mongoose.Schema(
  {
    batch_id: {
      type: Number,
      required: true,
      unique: true,  // Because batch_id is unique in Municipality
    },
    recycler_branch: {
      type: String,
      required: true,
      trim: true,
    },
    recycler_location: {
      type: String,
      required: true,
      trim: true,
    },
    received_weight: {
      type: Number,
      required: true,
    },
    recycled_weight: {
      type: Number,
      required: true,
    },
    non_recyclable_weight: {
      type: Number,
      required: true,
    },
    reason_non_recyclable: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

const Recycler = mongoose.model('Recycler', recyclerSchema);

export default Recycler;
