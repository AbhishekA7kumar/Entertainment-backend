const mongoose = require('mongoose');


// Define the User schema and model
const tvSeriesBookmarkSchema = new mongoose.Schema({
  tv_series_id: {
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

const TVBookmark = mongoose.model('TV', tvSeriesBookmarkSchema);

module.exports = { TVBookmark }
