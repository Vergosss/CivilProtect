const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const inventoryController = require("./../controllers/inventory.controller");
//
router.post('/modify_inventory/',LoggedIn,inventoryController.modifyInventory);//
router.post('/update_cargo/',LoggedIn,inventoryController.updateCargo);//
router.get('/get_inventory_cargos/',LoggedIn,inventoryController.getInventoryCargos);//
router.get('/load_cargo/',LoggedIn,inventoryController.loadCargo);//
router.post('/update_inventory/',LoggedIn,inventoryController.updateInventory);//
router.get('/load_inventory/',LoggedIn,inventoryController.loadInventory);//
router.get('/get_current_categories/',LoggedIn,inventoryController.getCurrentCategories);
//
module.exports = router;