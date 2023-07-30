const {  postJob, jobs } = require("../controllers/job")
const authMiddleware = require("../middleware/auth")

const jobRouter = require("express").Router()

jobRouter.post("/addJob",authMiddleware, postJob)
jobRouter.get("/jobs", jobs)

module.exports =  jobRouter