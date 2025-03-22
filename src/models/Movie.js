const mongoose = require('mongoose');


// Define the User schema and model
const movieBookmarkSchema = new mongoose.Schema({
  movie_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  bookmark: {
    type: Boolean,
    required: true,
    default: false
  }
});

const MovieBookmark = mongoose.model('Movie', movieBookmarkSchema);

module.exports = { MovieBookmark }
