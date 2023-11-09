const express = require('express')
const multer = require('multer');
const router = express.Router()
const upload = multer({ dest: 'uploads/' });
const authentication = require("../middleware/Authentication");
const PostController = require('../controllers/PostController')

router.post('/post',authentication, upload.single('image'), PostController.post)
router.get('/getPost', PostController.getPost)
// router.put('/changeCreatedPostStatus', PostController.changeCreatedPostStatus)

module.exports = router