const authRouter =  require("./authRoutes")
const express = require('express');
const jobRouter = require("./job");
const router = express.Router();

router.use("/auth",authRouter)
router.use("/job",jobRouter)

module.exports = router