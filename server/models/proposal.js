const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
 summary: {type: String, required: true},
  description: { type: String, required: true },
  price : {type:Number, required: true},
  time : {type:Number, required: true},
  milestone : {type:String},
  plan: {type:String},
  forJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to the Job model
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model who posts the proposal
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
