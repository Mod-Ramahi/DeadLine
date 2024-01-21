const {postProfile, profile, getProfileById, getProfileByCreator, editProfileRequest, filterProfiles} = require("../controllers/profile")
const authMiddleware = require("../middleware/auth")

const profileRouter = require("express").Router();

profileRouter.get("/", profile)
profileRouter.get('/filter', filterProfiles)
profileRouter.post("/postProfile",authMiddleware, postProfile)
profileRouter.get("/profileId/:id", getProfileById)
profileRouter.get("/creator/:id", getProfileByCreator)
profileRouter.put("/editProfile",authMiddleware, editProfileRequest)

module.exports = profileRouter;