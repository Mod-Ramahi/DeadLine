const {getPlans, editPlans, getPlanById} = require('../controllers/administration')
const authMiddleware = require('../middleware/auth')

const adminRouter = require('express').Router()

adminRouter.get('/membership', getPlans)
adminRouter.put('/membership/:id',  editPlans)
adminRouter.get('/findmembership/:id', getPlanById)

module.exports = adminRouter

