const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },
  country:String,
  timezone:String,
  joined: String,
  countryFlag: String,
  recommendation: Number ,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // Reference to the Review model
  }],
  type: {
    type: String,
    enum: ['user', 'freelancer'],
    default: 'user', // Default value is 'user'
  },
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
