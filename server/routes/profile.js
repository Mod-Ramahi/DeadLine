const {postProfile, profile, getProfileById, getProfileByCreator, editProfileRequest} = require("../controllers/profile")
const authMiddleware = require("../middleware/auth")

const profileRouter = require("express").Router();

profileRouter.get("/", profile)
profileRouter.post("/postProfile",authMiddleware, postProfile)
profileRouter.get("/:id", getProfileById)
profileRouter.get("/creator/:id", getProfileByCreator)
profileRouter.put("/editProfile",authMiddleware, editProfileRequest)

module.exports = profileRouter;