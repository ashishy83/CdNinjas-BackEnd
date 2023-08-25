const express = require('express');
const router = express.Router();

const authController = require("../controller/authController");

//User Registration

router.post('/enrollnow',authController.register);

//User Login

router.post("/login",authController.login);

//Enquiry form
router.post('/callback',authController.callbackController);

module.exports = router;
