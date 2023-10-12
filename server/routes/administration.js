const {getPlans, editPlans} = require('../controllers/administration')
const authMiddleware = require('../middleware/auth')

const adminRouter = require('express').Router()

adminRouter.get('/membership', getPlans)
adminRouter.put('/membership/:id',  editPlans)

module.exports = adminRouter

