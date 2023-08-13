const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the client (User model)
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
