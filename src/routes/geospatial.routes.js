const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const geospatialController = require("./../controllers/geospatial.controller");
//
router.get('/coordinates/',LoggedIn,geospatialController.Coordinates);//
router.get('/get_coordinates/',LoggedIn,geospatialController.getCoordinates);//
router.get('/get_base/',LoggedIn,geospatialController.getBase);//
router.get('/citizens/',LoggedIn,geospatialController.Citizens);//
router.get('/get_vehicle/',LoggedIn,geospatialController.getVehicle);//
router.get('/get_vehicles/',LoggedIn,geospatialController.getVehicles);//
router.post('/update_vehicle/',LoggedIn,geospatialController.updateVehicle);//
router.post('/change_base/',LoggedIn,geospatialController.changeBase);//
//
module.exports = router;