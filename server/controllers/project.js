const Project = require('../models/project');

const postProject = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!req.user || !req.user.id) {
            return res.status(401).json({message:'User authentication failed'})
        }
        const {portfolioName, portfolioDescription} = req.body.data;
        const userType = req.user.userType;
        if (userType === 'buyer') {
            return res.status(409).json({message:'user is a buyer and cannot post portfolio'});
        }
        const newProject = new Project({
            portfolioName,
            portfolioDescription,
            createdBy: req.user.id,
        });
        await newProject.save();
        res.status(200).json({message:'project posted successfully'})
    }catch(error){
        res.status(500).json({message:'error posting project'})
    }
}

module.exports = {postProject};