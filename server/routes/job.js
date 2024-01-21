const {  postJob, jobs, singleJob, getJobByCreator, deleteJobById, getJobById, filterJobs } = require("../controllers/job")
const authMiddleware = require("../middleware/auth")

const jobRouter = require("express").Router()

jobRouter.post("/addJob",authMiddleware, postJob)
jobRouter.get("/filter", filterJobs)
jobRouter.get("/", jobs)
jobRouter.get("/jobId/:id", getJobById)
jobRouter.get("/creator/:id", getJobByCreator)
jobRouter.delete("/delete/:id", authMiddleware, deleteJobById)

module.exports =  jobRouter