const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

const authController = require('../controller/authController');


router.post('/profile',authController,userController.getUserProfile);

router.post('/profile',authController,userController.updateUserProfile);

module.exports = router;