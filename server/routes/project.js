const {postProject, getProfileProjectByCreatorId, getPortfolioById} = require("../controllers/project")
const authMiddleware = require("../middleware/auth")

const projectRouter = require("express").Router()

projectRouter.post("/postProject", authMiddleware, postProject)
projectRouter.get("/getProjectByCreatorId/:id", getProfileProjectByCreatorId)
projectRouter.get('/:id', getPortfolioById)

module.exports = projectRouter;