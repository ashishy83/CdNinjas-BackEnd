const Course = require('../models/Course');

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Course Details
exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error('Error retrieving course details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { name, description, instructor, curriculum } = req.body;

    // Create a new course
    const course = new Course({
      name,
      description,
      instructor,
      curriculum
    });

    await course.save();

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = exports;
