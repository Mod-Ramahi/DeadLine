const express = require('express');
const router = express.Router();
const Job = require('../models/job');


// Route: POST /jobs
const postJob = async (req, res) =>{
  try {
    const { title, description, company, salary, location, experience, skills } = req.body;

    // Create a new job instance
    const newJob = new Job({
      title,
      description,
      company,
      salary,
      location,
      experience,
      skills,
      // Add other fields as needed
    });

    // Save the job to the database
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
    const jobs = await Job.find(filter);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
  }
};




module.exports = {postJob, jobs};