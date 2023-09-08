const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    portfolioName: {type: String, required:true},
    portfolioDescription: {type: String, required:true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'Freelancer', required: true},
},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;