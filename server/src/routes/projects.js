const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/auth');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const projects = await Project.find(filter).sort({ completedAt: -1 });
    res.json({ projects });
  }),
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.json({ project });
  }),
);

router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  }),
);

router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.json({ project });
  }),
);

router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.json({ ok: true });
  }),
);

module.exports = router;
