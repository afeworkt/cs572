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

addCourse = function(req, res) {

    console.log("Adding new course");

    Student.findById(req.params.studentId).select('courses').exec(function(err, doc) {
        console.log("student for review", doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Student not found to add course" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        _addCourse(doc, req, res);
    });
};

function _addCourse(student, req, res) {

    console.log("adding course");

    const course = {
        name: req.body.name,
        courseNumber: req.body.courseNumber,
        description:req.body.description
    }
    if (!student.courses || student.courses==='') {
        student.courses = [];
    }
   
    student.courses.push(course);
 
    student.save(function(err, updated) {

        const response = {
            status: 500,
            message: err
        }
        if (updated) {
            response.status = 201;
            response.message = updated.courses;
        }
        res.status(response.status).json(response.message);
    });
}


deleteCourse= function(req, res) {
    console.log('deliting course from student');

    Student.findById(req.params.studentId).select("courses").exec(function(err, doc) {

        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "student not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        }
        _deleteCourse(doc, req, res);
    });
}

function _deleteCourse(student, req, res) {

    const reviewToUpdate = student.courses.id(req.params.courseId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "course not found" });
    }

    reviewToUpdate.remove();

    student.save(function(err, updt) {
        const response = {
            status: 204,
            message: updt
        };

        if (err) {
            response.message = err;
            response.status = 500;
        }

        res.status(response.status).json(response.message);
    });
}

module.exports={
    getCourse:getCourse,
    getCourses:getCourses,
    addCourse:addCourse,
    deleteCourse:deleteCourse
};