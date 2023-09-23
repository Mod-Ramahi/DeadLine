const { login, signup, completeRegister, editUser, editEmail} = require("../controllers/authController")
const authMiddleware = require("../middleware/auth")

const authRouter = require("express").Router()

authRouter.post("/login", login)
authRouter.post("/register", signup)
authRouter.post("/complete-register", authMiddleware, completeRegister);
authRouter.put("/settings", authMiddleware, editUser)
authRouter.put("/emailchange", authMiddleware, editEmail)

module.exports = authRouter