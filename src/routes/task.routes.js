const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const taskController = require("./../controllers/task.controller");
router.post('/create_task/',LoggedIn,taskController.createTask);//
router.get('/get_tasks/',LoggedIn,taskController.getTasks);//
router.post('/complete_task/',LoggedIn,taskController.completeTask);//
router.post('/cancel_task/',LoggedIn,taskController.cancelTask);//
//
module.exports = router;