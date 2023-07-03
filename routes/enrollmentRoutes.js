const express = require('express');
const router = express.Router();
const enrollmentController = require('../controller/enrollmentController');
const authController = require('../controller/authController')


router.post('/enroll',authController,enrollmentController.enrollInCourse);
router.get('/enrolled-course',authController,enrollmentController.getEnrolledCourses);

module.exports = router; 