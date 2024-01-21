const Proposal = require('../models/proposal');


const bidOnJob = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.id;
    if (!req.user || !req.user.id || !token) {
      return res.status(401).json({ message: 'User authentication failed' })
    }
    const { summary, description, price, time, milestone, plan, bidVerified, bidPromoted } = req.body.data;
    const newProposal = new Proposal({
      summary, description, price, time, milestone, plan, verified:bidVerified, promoted:bidPromoted, 
      createdBy: req.user.id,
      forJobId: id,
    });
    await newProposal.save()
    res.status(200).json({ message: 'successful proposal', proposal: newProposal });
  } catch (error) {
    res.status(500).json({ message: 'error posting the proposal', error: error.message })
  }
}

const getProposalByJob = async (req, res) => {
  try {
    const id = req.params.id
    const proposal = await Proposal.find({ forJobId: id });
    if (!proposal) {
      return res.status(404).json({ message: "no proposals found" })
    }
    res.json(proposal)
  } catch (error) {
    res.status(500).json({ message: 'error getting proposals', error: error.message })
  }
}

const getProposalById = async (req, res) => {
  try {
    const id = req.params.id;
    const proposal = await Proposal.findById(id);
    if (!proposal) {
      res.status(404).json({ message: 'no proposal found' })
    }
    res.json(proposal)
  } catch (error) {
    res.status(500).json({ message: 'error getting proposals', error: error.message })
  }
}
const getProposalByCreatorId = async (req, res) => {
  try {
    const id = req.params.id
    const proposal = await Proposal.find({ createdBy: id });
    if (!proposal) {
      return res.status(404).json({ message: 'no proposal found' })
    }
    res.json(proposal)
  } catch (error) {
    res.status(500).json({ message: 'error getting proposals', error: error.message })
  }
}
const deleteProposalById = async (req, res) => {
  try {
    const token = req.headers.authorization
    const id = req.params.id
    if (!token || !req.user.id || !req.user) {
      return res.status(401).json({ message: 'User authentication error' })
    }
    const deleted = await Proposal.findByIdAndDelete(id)
    if (!deleted) {
      return res.status.json({ message: 'Failed get/delete proposal. please try again' })
    }
    res.json(deleted)
  }catch(error){
    res.status(500).json({message:'error while trying get and delete proposal', error:error.message})
  }
}



module.exports = { bidOnJob, getProposalByJob, getProposalById, getProposalByCreatorId, deleteProposalById }