const { bidOnJob, getProposalByJob, getProposalById, getProposalByCreatorId, deleteProposalById } = require("../controllers/proposal")
const authMiddleware = require("../middleware/auth")

const proposalRouter = require("express").Router()

proposalRouter.post("/bidforJob/:id", authMiddleware, bidOnJob)
proposalRouter.get('/forJob/:id', getProposalByJob)
proposalRouter.get('/:id', getProposalById)
proposalRouter.get('/creator/:id', getProposalByCreatorId)
proposalRouter.delete('/delete/:id', authMiddleware, deleteProposalById)

module.exports =  proposalRouter