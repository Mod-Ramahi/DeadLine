const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: Number },
  deliveryTime:{type: Number},
  paymentMethod:{type: String},
  payByHour: { type: Boolean },
  vipPost: { type: Boolean },
  currency: { type: String },
  skills: { type: [String] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
  status:{type:String}
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;