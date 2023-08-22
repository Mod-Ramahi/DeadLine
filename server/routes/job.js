const {  postJob, jobs, singleJob } = require("../controllers/job")
const authMiddleware = require("../middleware/auth")

const jobRouter = require("express").Router()

jobRouter.post("/addJob",authMiddleware, postJob)
jobRouter.get("/", jobs)
jobRouter.get("/:id", singleJob)

module.exports =  jobRouter