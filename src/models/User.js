const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ROLE_TYPES = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
  ORGANIZER: 'Organizer'
}

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name..!']
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message:"Enter a valid email address."
    },
    required: [true, 'Email address is required'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [ROLE_TYPES.ADMIN, ROLE_TYPES.CUSTOMER, ROLE_TYPES.ORGANIZER], 
    default: ROLE_TYPES.CUSTOMER
  }
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = { User }
