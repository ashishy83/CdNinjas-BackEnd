const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a Course
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in the course' });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
    });

    await enrollment.save();

    res.status(201).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error retrieving enrolled courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = exports;
