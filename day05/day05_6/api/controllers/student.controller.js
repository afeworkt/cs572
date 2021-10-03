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
addOneStudent = function (req, res) {
    const newStudent = {
        name: req.body.name,
        GPA: parseInt(req.body.GPA),
        courses:[]
    };

    Student.create(newStudent, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
        }
    });
}

updateStudent = function (req, res) {
    console.log(`Update student`);
    let studentId = req.params.studentId;
    Student.findById(studentId).select("-courses").exec(function (err, doc) {
        if (err) {
            res.status(500).json({ "message": err });
            return;
        } else {
            if (!doc) {
                res.status(404).json({ "message": `Cannot update student. Student with id ${studentId} not found!` });
                return;
            }
            else {
                _updateStudent(doc, req, res);
            }
        }
    });
}
function _updateStudent(doc, req, res) {

    doc.title = req.body.title;
    doc.year = parseInt(req.body.year);
    doc.rate = parseInt(req.body.rate);
    doc.price = parseFloat(req.body.price);
    doc.minPlayers = parseInt(req.body.minPlayers);
    doc.maxPlayers = parseInt(req.body.maxPlayers);
    doc.minAge = parseInt(req.body.minAge);
    doc.designers = req.body.designers;
    doc.save(function (err, updatedStudent) {
        if (err) {
            res.status(500).json({ "message": err });
        } else {
            res.status(204).json(doc);
        }
    });
};
deleteStudent =function(req,res){
    let studentId = req.params.studentId;
    console.log("deleting student with id: "+studentId);
    Student.findByIdAndRemove(studentId, function(err, doc) {
        if (err) {
            res.status(500).json({message: err});
        } else {
                res.status(404).json({ "message": `Student with id ${studentId} successfully deleted!` });
          }
    });
}

module.exports = {
    getAllStudents: getAllStudents,
    getOneStudent: getOneStudent,
    addOneStudent: addOneStudent,
    updateStudent:updateStudent,
    deleteStudent:deleteStudent
}