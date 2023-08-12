const authRouter =  require("./authRoutes")
const express = require('express');
const jobRouter = require("./job");
const reviewRouter = require("./reviwe");
const proposalRouter = require("./proposal");
const router = express.Router();

router.use("/auth",authRouter)
router.use("/job",jobRouter)
router.use("/review",reviewRouter)
router.use("/proposal",proposalRouter)

module.exports = router