const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    headline: {type: String, required:true},
    aboutMe: {type: String, required:true},
    aboutService: {type: String, required:true},
    serviceSummary: {type: String, required:true},
    mainCategory: {type: String, required:true},
    subCategory: {type: String},
    topSkills : [String],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer'},
}, {timestamps: true});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;