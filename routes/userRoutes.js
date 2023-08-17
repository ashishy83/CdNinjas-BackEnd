const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

const authController = require('../controller/authController');


router.post('/profile/user',userController.getUserProfile);

router.post('/profile/update',userController.updateUserProfile);

router.post('/callback',authController.callbackController);

module.exports = router;