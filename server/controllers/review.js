const Freelancer = require("../models/freeelancer");
const Review = require("../models/reviwe");

const review = async (req, res) => {
    try {
      const { freelancerId, rating, comment } = req.body;
      const clientId = req.user.userId; // Extract user ID from the JWT payload
  
      // Create a new review instance
      const newReview = new Review({
        client: clientId,
        rating,
        comment,
      });
  
      // Save the review to the database
      await newReview.save();
  
      // Update the freelancer's reviews array with the new review reference
      await Freelancer.findByIdAndUpdate(freelancerId, { $push: { reviews: newReview._id } });
  
      res.json({ message: 'Review submitted successfully', review: newReview });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review', error: error.message });
    }
  };

  module.exports =  review