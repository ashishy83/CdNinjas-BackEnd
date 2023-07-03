const express = require('express')
const router = express.Router();

const courseController = require("../controller/courseController");

router.get('/courses',courseController.getAllCourses);
router.get('/courses',courseController.getCourseDetails);

module.exports = router;