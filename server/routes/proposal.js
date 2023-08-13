const { createProposal, getProposalsForJob, getProposalById } = require("../controllers/proposal")
const authMiddleware = require("../middleware/auth")

const proposalRouter = require("express").Router()

proposalRouter.post("/",authMiddleware, createProposal)
proposalRouter.get("/:id", getProposalById)
proposalRouter.get("/", getProposalsForJob)

module.exports =  proposalRouter