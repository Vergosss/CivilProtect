const express = require("express");
const router = express.Router();
//
const userController = require("./../controllers/user.controller");
const {LoggedIn} = require("./../middleware/auth.middleware");
//
router.get('/logout/',LoggedIn,userController.logout);//
router.post('/signup/',userController.Signup);//
router.get('/signup/',userController.signupPage);//
router.get('/home/',userController.homePage);//
router.post('/login/',userController.Login);//
router.get('/login/',userController.loginPage);//
router.get('/',userController.loginPage);//
router.post('/register_rescuer/',LoggedIn,userController.registerRescuer);//
//
module.exports = router;