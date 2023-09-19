const {  postJob, jobs, singleJob, getJobByCreator, deleteJobById, getJobById } = require("../controllers/job")
const authMiddleware = require("../middleware/auth")

const jobRouter = require("express").Router()

jobRouter.post("/addJob",authMiddleware, postJob)
jobRouter.get("/", jobs)
jobRouter.get("/:id", getJobById)
jobRouter.get("/creator/:id", getJobByCreator)
jobRouter.delete("/delete/:id", authMiddleware, deleteJobById)

module.exports =  jobRouter