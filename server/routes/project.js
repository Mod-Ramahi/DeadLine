const {postProject} = require("../controllers/project")
const authMiddleware = require("../middleware/auth")

const projectRouter = require("express").Router()

projectRouter.post("/postProject", authMiddleware, postProject)

module.exports = projectRouter;