const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const {upload} = require("./../middleware/file.middleware");
const itemController = require("./../controllers/item.controller");
router.get('/get_items/',LoggedIn,itemController.getItems);//
router.get('/get_categories/',LoggedIn,itemController.getCategories);//
router.post('/add_item/',LoggedIn,itemController.addItem);//
router.post('/add_category/',LoggedIn,itemController.addCategory);//
router.post('/update_products/',LoggedIn,itemController.updateProducts);//
router.post('/upload_products/',LoggedIn,upload.single('file'),itemController.uploadProducts);
//
module.exports = router;