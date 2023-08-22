const { getAllMemberships, subscribeToMembership } = require("../controllers/membership");

const memberShipRouter = require("express").Router()

memberShipRouter.get('/', getAllMemberships);
memberShipRouter.post("/subscribe", subscribeToMembership)

module.exports =  memberShipRouter