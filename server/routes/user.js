const {getFreelancerById} = require ('../controllers/freelancer');

const userRouter = require("express").Router();

userRouter.get("/:id", getFreelancerById)

module.exports= userRouter;