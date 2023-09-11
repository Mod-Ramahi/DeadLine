const Profile = require('../models/profile');

const postProfile = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!req.user || !req.user.id || !token) {
            return res.status(401).json({message:'User authentication failed'})
        }
        const {headline, aboutMe, aboutService, serviceSummary, mainCategory, subCategory, topSkills, hourPrice } = req.body.formData;
        const newProfile = new Profile({
            headline,
            serviceSummary,
            aboutMe,
            aboutService,
            mainCategory,
            subCategory,
            topSkills,
            hourPrice,
            createdBy: req.user.id,
        });
        await newProfile.save();
        res.status(200).json({message:'Profile posted successfully', profile: newProfile})
    }catch (error) {
        res.status(500).json({message:'error posting profile', error: error.message});
    }
}

const profile = async (req, res) => {
    try{
        const profiles = await Profile.find()
        if(!profiles || profiles.length === 0){
            return res.status(404).json({message: 'no profiles found'})
        }
        res.json(profiles);
    } catch (error){
        res.status(500).json({message:'Error recieving profiles', error: error.message})
    }
}

const getProfileById = async (req,res) => {
    const profileId = req.params.id;
    try{
        const profile = await Profile.findById(profileId);
        if(!profile) {
           return res.status(404).json({message:'profile not found'})
        }
        res.json(profile);
    }catch(error){
        res.status(500).json({message:'error fetching profile', error: error.message})
    }
}

const getProfileByCreator = async (req, res) => {
    const creator = req.params.id;
    try{
        const profile = await Profile.findOne({createdBy : creator})
        if(!profile){
           return res.status(404).json({message:'profile not found'})
        }
        res.json(profile)
    }catch(error){
        res.status(500).json({message:"error fetching profile",error: error.message})
    }
}

module.exports = {postProfile, profile, getProfileById, getProfileByCreator};