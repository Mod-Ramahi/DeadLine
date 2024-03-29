const Freelancer = require('../models/freeelancer');
const Job = require('../models/job');
const Proposal = require('../models/proposal');
const {postJobSchema} = require('../utils/validation')


const postJob = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the Authorization header
    if (!req.user || !req.user.id || !token) {
      return res.status(401).json({ message: 'User authentication failed' });
    }
    const { title, description, shortDescription, category, jobSubCateg, salary, Skills, currency, payByHour, paymentMethod, vipPost } = req.body.data;
    await postJobSchema.validate({ title, description, shortDescription, category, salary });

    const newJob = new Job({
      title,
      description,
      shortDescription,
      salary,
      Skills,
      category,
      currency,
      jobSubCateg,
      paymentMethod,
      payByHour,
      vipPost,
      createdBy: req.user.id,
    });

    await newJob.save();

    res.status(200).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
};

const getJobByCreator = async (req, res) => {
  try{
    const id = req.params.id
    const job = await Job.find({createdBy: id})
    if(!job){
      return res.status(404).json({message: 'no jobs founded'})
    }
    res.json(job)
  }catch(error){
    res.status(500).json({message:'error getting jobs by creator', error:error.message})
  }
}
// Route: GET /jobs
const filterJobs = async (req, res) => {
  try{
    const {sortBy, order,pageSize, data} = req.query
    const sort = sortBy
    const sortOrder = order
    const limit = pageSize
    console.log(data)
    let query = Job.find().sort({[sort]: sortOrder})
    if('selectedCategory' in data && data.selectedCategory ){
      query = query.where('category').equals(data.selectedCategory)
    }
    if('selectedSubCategory' in data && data.selectedSubCategory && data.selectedSubCategory !== 'all'){
      query = query.where('jobSubCateg').equals(data.selectedSubCategory)
    }
    if('searchText' in data && data.searchText && data.searchText !== ""){
      const searchTextRegex = new RegExp(data.searchText, 'i')
      query = query.or([
        {'title': {$regex: searchTextRegex}},
        {'shortDescription': {$regex : searchTextRegex}}
      ])
    }
    if('priceSelect' in data && data.priceSelect && data.priceSelect !== ''){
      const [minPrice, maxPrice] = data.priceSelect.split('-').map(Number)
      if(!isNaN(minPrice) && !isNaN(maxPrice)){
        query =  query.where('salary').gte(minPrice).lte(maxPrice)
      }else if(!isNaN(minPrice)){
        query = query.where('salary').gte(minPrice)
      } else if(!isNaN(maxPrice)){
        query = query.where('salary').lte(maxPrice)
      }
    }
    if('userCateg' in data && data.userCateg){
      query = query.where('category').equals(data.userCateg)
    }
    if('defaultResult' in data && data.defaultResult){
      query = query.find().sort({[sort]: sortOrder}).limit(limit)
    }
    query = query.limit(limit)
    const jobs = await query
    res.json(jobs)
  } catch (error) {
    res.status(500).json({message:'error getting jobs', error:error.message})
  }
}
const jobs = async (req, res) => {
  try{
    const {sortBy, order, pageSize, category} = req.query;
    
    const sort = sortBy
    const sortOrder = order
    const limit = pageSize
    console.log(category)
    let query = Job.find().sort({[sort]: sortOrder})
    if(category){
      query = query.where('category').equals(category)
    }
    query = query.limit(limit)
    const jobs = await query
    // const jobs = await Job.find()
    // .sort({[sort]: sortOrder})
    // .limit(limit)

    if(!jobs || jobs.length === 0){
      query = Job.find().sort({[sort]: sortOrder}).limit(limit)
      const updatedJobs = await query
      res.json(updatedJobs)
    }else {
      res.json(jobs)
    }
    // res.json(jobs)
  } catch (error) {
    res.status(500).json({message:'error getting jobs', error:error.message})
  }
}
// const jobs = async (req, res) => {
//   try {
//     const { title, company, salary, location, experience, skills } = req.query;

//     // Build the filter object based on the provided query parameters
//     const filter = {};

//     if (title) {
//       filter.title = { $regex: new RegExp(title, 'i') };
//     }

//     if (company) {
//       filter.company = { $regex: new RegExp(company, 'i') };
//     }

//     if (salary) {
//       filter.salary = { $gte: parseFloat(salary) };
//     }

//     if (location) {
//       filter.location = { $regex: new RegExp(location, 'i') };
//     }

//     if (experience) {
//       filter.experience = { $regex: new RegExp(experience, 'i') };
//     }

//     if (skills) {
//       filter.skills = { $all: skills.split(',') };
//     }

//     // Fetch jobs from the database based on the filter
//     const jobs = await Job.find(filter).populate('createdBy', 'name email');
//     const jobsWithProposals = await Promise.all(
//       jobs.map(async (job) => {
//         const proposals = await Proposal.find({ jobId: job._id });
//         return { ...job.toObject(), proposals };
//       })
//     );
//     res.json(jobsWithProposals);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
//   }
// };

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
const getJobById = async (req, res) => {
  try{
    const id =req.params.id
    const job = await Job.findById(id)
    if(!job){
      return res.status(404).json({message:'job not found or deleted'})
    }
    res.json(job)
  }catch(error){
    res.status(500).json({message:'error getting job post', error: error.message})
  }
}
const deleteJobById = async (req, res) => {
  try{
    const token = req.headers.authorization
    const id = req.params.id;
    if(!token || !req.user || !req.user.id){
      return res.status(401).json({message:'User authentication failed'})
    }
    const deleted = await Job.findByIdAndDelete(id)
    if(!deleted){
      return res.status(404).json({message:'cant find the job'})
    }
    res.json(deleted)
  }catch(error){
    res.status(500).json({message:'error get or delete job', error: error.message})
  }
}


module.exports = { postJob, jobs, singleJob, getJobByCreator, deleteJobById, getJobById, filterJobs };
