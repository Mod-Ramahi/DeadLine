// membershipController.js
const Freelancer = require('../models/freeelancer');
const Membership = require('../models/membership');

async function getAllMemberships(req, res) {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memberships', error: error.message });
  }
}

async function subscribeToMembership(req, res) {
  const { freelancerId, membershipId } = req.body;

  try {
    const membership = await Membership.findById(membershipId);
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const freelancer = await Freelancer.findByIdAndUpdate(freelancerId, { membership: membershipId }, { new: true });
    res.json({ message: 'Subscribed to membership', freelancer });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to membership', error: error.message });
  }
}

module.exports = {
  getAllMemberships,
  subscribeToMembership,
};
