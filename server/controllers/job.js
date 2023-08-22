const Freelancer = require('../models/freeelancer');
const Job = require('../models/job');
const Proposal = require('../models/proposal');


const postJob = async (req, res) =>{
  try {
    const { title, description, category, salary, Skills,currency,payByHour,paymentMethod,vipPost } = req.body.data;
    console.log(req.user)
      const newJob = new Job({
      title,
      description,
      salary,
      skills:Skills,
      category,
      currency,
      paymentMethod,
      payByHour,
      vipPost,
      createdBy:req.user.id,
    });

    await newJob.save();

    res.json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
};


// Route: GET /jobs
const jobs = async (req, res) => {
  try {
    const { title, company, salary, location, experience, skills } = req.query;

    // Build the filter object based on the provided query parameters
    const filter = {};

    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') };
    }

    if (company) {
      filter.company = { $regex: new RegExp(company, 'i') };
    }

    if (salary) {
      filter.salary = { $gte: parseFloat(salary) };
    }

    if (location) {
      filter.location = { $regex: new RegExp(location, 'i') };
    }

    if (experience) {
      filter.experience = { $regex: new RegExp(experience, 'i') };
    }

    if (skills) {
      filter.skills = { $all: skills.split(',') };
    }

    // Fetch jobs from the database based on the filter
    const jobs = await Job.find(filter).populate('createdBy', 'name email');
    const jobsWithProposals = await Promise.all(
      jobs.map(async (job) => {
        const proposals = await Proposal.find({ jobId: job._id });
        return { ...job.toObject(), proposals }; 
      })
    );
    res.json(jobsWithProposals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
  }
};

const singleJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Fetch the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Fetch the user who created the job (creator)
    console.log(33)
    const creator = await Freelancer.findById(job.createdBy._id);
    if (!creator) {
      return res.status(404).json({ message: 'Job creator not found' });
    }

    // Fetch related proposals for the job
    const proposals = await Proposal.find({ jobId });

    // Combine the job data with the creator's user data and proposals
    const jobWithCreatorAndProposals = {
      ...job.toObject(),
      creator: creator.toObject(),
      proposals: proposals.map(proposal => proposal.toObject()), // Convert each proposal to plain object
    };

    res.json(jobWithCreatorAndProposals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job', error: error.message });
  }
}


module.exports = {postJob, jobs, singleJob};
