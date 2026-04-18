const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect, admin } = require('../middleware/auth');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, phone, address, service, preferredDate, budget, message } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error('name and email are required');
    }
    let serviceDoc = null;
    let serviceTitle = '';
    if (service) {
      if (!mongoose.isValidObjectId(service)) {
        res.status(400);
        throw new Error('Invalid service ID');
      }
      serviceDoc = await Service.findById(service);
      if (serviceDoc) serviceTitle = serviceDoc.title;
    }
    const booking = await Booking.create({
      name,
      email,
      phone,
      address,
      service: serviceDoc ? serviceDoc._id : undefined,
      serviceTitle,
      preferredDate,
      budget,
      message,
    });
    res.status(201).json({ booking });
  }),
);

router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate('service', 'title slug').sort({ createdAt: -1 });
    res.json({ bookings });
  }),
);

router.patch(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    res.json({ booking });
  }),
);

router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    res.json({ ok: true });
  }),
);

module.exports = router;
