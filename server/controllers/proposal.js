const Proposal = require('../models/proposal');

// Controller for creating a proposal
exports.createProposal = async (req, res) => {
  try {
    const { jobId, description, price, deliveryTime, file, milestone, plan } = req.body.data;
    const {id} = req.user
    console.log(req.body.data,3)
    console
    // Create a new proposal instance
    const newProposal = new Proposal({
      jobId,
      userId:id,
      description,
      price:parseInt(price),
      deliveryTime:parseInt(deliveryTime),
      file,
      milestone,
      plan,
    });

    // Save the proposal to the database
    await newProposal.save();

    res.status(201).json({ message: 'Proposal created successfully', proposal: newProposal });
  } catch (error) {
    res.status(500).json({ message: 'Error creating proposal', error: error.message });
  }
};

// Controller for fetching a proposal by ID
exports.getProposalById = async (req, res) => {
  try {
    const proposalId = req.params.id;

    // Find the proposal in the database by ID
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proposal', error: error.message });
  }
};

exports.getProposalsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find all proposals for the specified job in the database
    const proposals = await Proposal.find({ jobId });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proposals', error: error.message });
  }
};
