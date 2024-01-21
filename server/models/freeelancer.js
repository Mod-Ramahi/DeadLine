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
  provider: {
    type: String,
    enum: ['email', 'google'],
    default:'email'
  },
  password: {
    type: String,
    required: function(){
      return this.provider === 'email'
    },
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
  balance: {type: Number, default:0},
  bidCounter:{type: Number, default:0},
  privateCounter:{type: Number, default:0},
  followingCounter:{type: Number, default:0},
  skillsCounter:{type: Number, default:0},
  endDate:{type: Date},

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
  following : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Freelancer'
  }],
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
