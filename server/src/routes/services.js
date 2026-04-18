const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');
const { protect, admin } = require('../middleware/auth');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    const services = await Service.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json({ services });
  }),
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json({ service });
  }),
);

router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const service = await Service.create(req.body);
    res.status(201).json({ service });
  }),
);

router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json({ service });
  }),
);

router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json({ ok: true });
  }),
);

module.exports = router;
