const Profile = require('../models/profile');

const postProfile = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!req.user || !req.user.id) {
            return res.status(401).json({message:'User authentication failed'})
        }
        const {headline, aboutMe, aboutService, serviceSummary, mainCategory, subCategory, topSkills } = req.body.formData;
        const userType = req.user.userType;
        if(userType === 'buyer'){
            return res.status(409).json({message: "the user is buyer and can't post a profile"});
        }
        const newProfile = new Profile({
            headline,
            serviceSummary,
            aboutMe,
            aboutService,
            mainCategory,
            subCategory,
            topSkills,
            createdBy: req.user.id,
        });
        await newProfile.save();
        res.status(200).json({message:'Profile posted successfully', profile: newProfile})
    }catch (error) {
        res.status(500).json({message:'error posting profile', error: error.message});
    }
}

module.exports = {postProfile};