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
  password: {
    type: String,
    required: true,
  },
  proname: String,
  // profileID: {
  //   type: mongoose.Schema.ObjectId,
  //   ref:'Profile'
  // },
  membershipID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },

  country:String,
  countryFlag: String,
  timezone:String,
  joined: String,
  // recommendation: Number ,
  
  avatar: String,
  category: String,
  skills: [String],
  // hourlyRate: Number,
  // bio: String,
  projectsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  projectsCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  reviewsID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // Reference to the Review model
  }],
  userType: {
    type: String,
    enum: ['seller', 'buyer'],
    default: 'seller', // Default value is 'user'
  },
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema,);

module.exports = Freelancer;
