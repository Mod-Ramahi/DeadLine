const review = require("../controllers/review")
const authMiddleware = require("../middleware/auth")

const reviewRouter = require("express").Router()

reviewRouter.post("/:id",authMiddleware, review)

module.exports =  reviewRouter