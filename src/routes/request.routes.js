const express = require("express");
const router = express.Router();

const {LoggedIn} = require("./../middleware/auth.middleware");
const requestController = require("./../controllers/request.controller");
router.post('/request/',LoggedIn,requestController.Request);//
router.get('/get_requests/',LoggedIn,requestController.getRequests);//
router.get('/fetch_requests/',LoggedIn,requestController.fetchRequests);//
router.get('/receive_requests/',LoggedIn,requestController.receiveRequests);//

//
module.exports = router; //export all the routes