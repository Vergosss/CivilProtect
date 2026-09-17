const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const statisticsController = require("./../controllers/statistics.controller");
//
router.get('/graph/',LoggedIn,statisticsController.Graph);
router.post('/get_dates/',LoggedIn,statisticsController.getDates);

//
module.exports = router;