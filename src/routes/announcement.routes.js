const express = require("express");
const router = express.Router();
//
const {LoggedIn} = require("./../middleware/auth.middleware");
const announcementController = require("./../controllers/announcement.controller");
router.get('/get_announcements/',LoggedIn,announcementController.getAnnouncements);
router.post('/create_announcement/',LoggedIn,announcementController.createAnnouncement);
//
module.exports = router;