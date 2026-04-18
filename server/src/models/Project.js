const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    category: {
      type: String,
      enum: ['kitchen', 'bathroom', 'flooring', 'painting', 'roofing', 'exterior', 'general'],
      default: 'general',
    },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    budget: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Project', projectSchema);
