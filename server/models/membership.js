const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true
  },
  skillsNumber:{
    type: Number,
    required:true,
  },
  bidsNumber:{
    type: Number,
    required:true,
  },
  privateBids: {
    type: Number,
    required: true,
  },
  following:{
    type: Number,
    required:true
  },
  promoted: {
    type: Boolean,
    default:false
  },
  proVerified: {
    type: Boolean,
    default: false
  },
})

const Membership = mongoose.model('Membership', membershipSchema)

module.exports = Membership;

