const mongoose = require('mongoose');
const { boolean } = require('yup');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: Number },
  paymentMethod:{type: String},
  location: { type: String },
  experience: { type: String },
  skills: { type: [String] },
//   vip:{type:boolean}
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
