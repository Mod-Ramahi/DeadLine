const {postProfile} = require("../controllers/profile")
const authMiddleware = require("../middleware/auth")

const profileRouter = require("express").Router();

profileRouter.post("/postProfile",authMiddleware, postProfile)

module.exports = profileRouter;