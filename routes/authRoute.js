const express = require('express');
const router = express.Router();

const authController = require("../controller/authController");

//User Registration

router.post('/enrollnow',authController.register);

//User Login

router.post("/login",authController.login);

module.exports = router;
