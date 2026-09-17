const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const offerController = require("./../controllers/offer.controller");
router.get('/receive_offers/',LoggedIn,offerController.receiveOffers);
router.post('/offer/',LoggedIn,offerController.Offer);      
//
module.exports = router;