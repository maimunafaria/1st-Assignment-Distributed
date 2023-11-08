const express = require('express')
const router = express.Router()
const authentication = require("../middleware/Authentication");
const NotificationController = require('../controllers/NotificationController')

router.get('/getNotification',authentication,NotificationController.getNotification)
router.post('/createNotification', NotificationController.createNotificationsForUsers);
router.put('/approve',authentication,NotificationController.approve)

module.exports = router