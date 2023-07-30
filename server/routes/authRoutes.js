const { login, signup } = require("../controllers/authController")

const authRouter = require("express").Router()

authRouter.post("/login", login)
authRouter.post("/register", signup)

module.exports =  authRouter