const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to the Job model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model who posts the proposal
  description: { type: String, required: true },
  price : {type:Number, required: true},
  deliveryTime : {type:Number, required: true},
  file : {type:String},
  milestone: {type:String},
  plan: {type:String}
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
