const authRouter =  require("./authRoutes")
const express = require('express');
const jobRouter = require("./job");
const reviewRouter = require("./reviwe");
const proposalRouter = require("./proposal");
const memberShipRouter = require("./memberShipe");
const userRouter = require("./user");
const profileRouter = require("./profile");
const projectRouter = require("./project");
const router = express.Router();

router.use("/auth",authRouter)
router.use("/job",jobRouter)
router.use("/review",reviewRouter)
router.use("/proposal",proposalRouter)
router.use("/membership",memberShipRouter)
router.use("/user", userRouter)
router.use("/profile", profileRouter)
router.use("/project", projectRouter)

module.exports = router