const mongoose = require('mongoose');
const Student = mongoose.model('Student');

getAllStudents = function (req, res) {
    console.log("GET the students");
    const maxAllowedCount = 10, defaultCount = 5, offset = 0;

    let count = defaultCount;

    if (req.query) {
        if (req.query.count) {
            count = parseInt(req.query.count) > maxAllowedCount ? maxAllowedCount : parseInt(req.query.count);
        }
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }
    }

    Student.find().limit(count).skip(offset).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Students" });
        } else {
            console.log("Found students");
            res.status(200).json(docs);
        }
    });
}

getOneStudent = function (req, res) {
    let studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        res.status(400).json({ "message": "Error: Please enter a valid student Id" });
        return;
    }
    Student.findById(studentId, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Students" });
        }
        else {
            if (!data) {
                console.log(err);
                res.status(404).json({ message: `Cannot find Student with Id:${studentId}` });
            } else {
                res.status(200).json(data);
            }
        }
    });

}
module.exports = {
    getAllStudents: getAllStudents,
    getOneStudent: getOneStudent
}