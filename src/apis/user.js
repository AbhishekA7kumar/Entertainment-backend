require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models/User');
const MESSAGES = require('../utils/constants');

const userRouter = require('express').Router();

// ✅ Register route
userRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists" });
    }

    // ✅ पासवर्ड को पहले हैश करें
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error("❌ Error in register route:", err);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// ✅ Login route (JWT Authentication)
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "❌ Invalid email or password" });
    }

    console.log("🔍 Found user:", user); // Debugging

    // ✅ पासवर्ड को चेक करें
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match Status:", isMatch); // Debugging

    if (!isMatch) {
      return res.status(400).json({ message: "❌ Invalid email or password" });
    }

    // ✅ JWT Token बनाएं
    const payload = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: '✅ Login successful',
      token: token
    });
  } catch (err) {
    console.error("❌ Error in login route:", err);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// ✅ Profile Route (JWT Auth Required)
userRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Profile accessed',
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = { userRouter };
