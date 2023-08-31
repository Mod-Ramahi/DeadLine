const { login, signup, completeRegister} = require("../controllers/authController")
const authMiddleware = require("../middleware/auth")

const authRouter = require("express").Router()

authRouter.post("/login", login)
authRouter.post("/register", signup)
authRouter.post("/complete-register", authMiddleware, completeRegister);

module.exports = authRouter