const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['kitchen', 'bathroom', 'flooring', 'painting', 'roofing', 'exterior', 'general'],
      default: 'general',
    },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, default: 7, min: 1 },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Service', serviceSchema);
