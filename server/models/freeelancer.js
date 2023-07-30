const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  skills: [String],
  hourlyRate: Number,
  bio: String,
  projectsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  projectsCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  reviews: [{
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: String,
  }],
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
