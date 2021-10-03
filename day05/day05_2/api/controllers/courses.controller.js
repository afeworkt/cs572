const mongoose = require('mongoose');

const Student = mongoose.model('Student');

getCourses = function(req, res) {

    console.log(`Getting a student courses`);

    Student.findById(req.params.studentId).select('courses').exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Your requested unavailable resource" };
        } else {
            response.message = doc.courses;
        }

        res.status(response.status).json(response.message);
    });
};

getCourse = function(req, res) {
    console.log(`get student course by course id ${req.params.courseId}`);

    Student.findById(req.params.studentId).select('courses').exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Student review not found!" };
        } else {
            response.message = doc.courses.id(req.params.courseId);
        }

        res.status(response.status).json(response.message);
    });
}

module.exports={
    getCourse:getCourse,
    getCourses:getCourses
};