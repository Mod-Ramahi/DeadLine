const Membership = require('../models/membership');
const jwtUtils = require('../utils/jwtUtils')

const getPlans = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm
        if (!searchTerm) {
            const plan = await Membership.find()
            if (!plan || plan.length === 0) {
                return res.status(404).json({ message: 'no plans found' })
            }
            return res.status(200).json(plan);
        }
        const filteredPlans = await Membership.find({name:{$not: {$regex: searchTerm, $options: 'i'}}})
        if(!filteredPlans || filteredPlans.length ===0){
            return res.status(404).json({ message: 'no plans found with searchTerms' })
        }
        res.status(200).json(filteredPlans)
    } catch (error) {
        res.status(500).json({ message: 'Error recieving membership plans', error: error.message })
    }
}

const editPlans = async (req, res) => {
    try {
        // const token = req.headers.authorization;
        const id = req.params.id
        // if(!req.user || !token ) {
        //     return res.status(401).json({message:'User authentication failed'});
        // }
        const { price, skillsNumber, bidsNumber, privateBids, following, promoted, proVerified } = req.body.data;
        const plan = await Membership.findById(id)
        if (!plan || plan.length === 0) {
            return res.status(404).json({ message: 'Plan not found' })
        }
        plan.price = price;
        plan.skillsNumber = skillsNumber;
        plan.bidsNumber = bidsNumber;
        plan.privateBids = privateBids;
        plan.following = following;
        plan.promoted = promoted;
        plan.proVerified = proVerified;
        await plan.save();
        res.status(200).json({ message: 'plan been editid successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'failed to edit /find membership plan', error: error.message })
    }
}

module.exports = { getPlans, editPlans };