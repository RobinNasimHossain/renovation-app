const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { signToken } = require('../utils/token');

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('name, email, and password are required');
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      res.status(409);
      throw new Error('Email is already registered');
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  }),
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('email and password are required');
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }
    res.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  }),
);

router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }),
);

module.exports = router;
