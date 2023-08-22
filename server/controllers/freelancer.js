const Freelancer = require("../models/freeelancer");

async function getAllFreelancers(req, res) {
    try {
      const freelancers = await Freelancer.find({type:'freelancer'});
      res.json(freelancers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching freelancers', error: error.message });
    }
  }
  
  // Controller for getting details of a specific freelancer
  async function getFreelancerById(req, res) {
    const freelancerId = req.params.id;
  
    try {
      const freelancer = await Freelancer.findById(freelancerId);
      if (!freelancer) {
        return res.status(404).json({ message: 'Freelancer not found' });
      }
      res.json(freelancer);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching freelancer', error: error.message });
    }
  }

module.exports = {
    getAllFreelancers,
    getFreelancerById,
  };