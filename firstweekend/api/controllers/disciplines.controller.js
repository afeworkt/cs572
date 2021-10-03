const mongoose = require('mongoose');

const Cycling = mongoose.model('Cycling');

getDisciplines = function(req, res) {

    console.log(`Getting a cycling disciplines`);

    Cycling.findById(req.params.cyclingEventId).select('disciplines').exec(function(err, doc) {
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
            response.message = doc.disciplines;
        }

        res.status(response.status).json(response.message);
    });
};

getDiscipline = function(req, res) {
    console.log(`get cycling discipline by event id ${req.params.cyclingEventId}`);

    Cycling.findById(req.params.cyclingEventId).select('disciplines').exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Cycling decipline not found!" };
        } else {
            response.message = doc.disciplines.id(req.params.disciplineId);
        }

        res.status(response.status).json(response.message);
    });
}

addDiscipline = function(req, res) {

    console.log("Adding new discipline");

    Cycling.findById(req.params.cyclingEventId).select('disciplines').exec(function(err, doc) {
   
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Cycling not found to add course" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        _addDiscipline(doc, req, res);
    });
};

function _addDiscipline(cycling, req, res) {

    console.log("adding course");

    const discipline = {
        type: req.body.type,
        description:req.body.description
    }
    if (!cycling.disciplines) {
        cycling.disciplines = [];
    }
   
    cycling.disciplines.push(discipline);
 
    cycling.save(function(err, updated) {

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


deleteDiscipline= function(req, res) {
    console.log('deliting discipline from cycling');

    Cycling.findById(req.params.cyclingEventId).select("disciplines").exec(function(err, doc) {

        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "cycling not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        }
        _deleteDiscipline(doc, req, res);
    });
}

function _deleteDiscipline(cycling, req, res) {

    const deciplineUpdate = cycling.disciplines.id(req.params.courseId);

    if (!deciplineUpdate) {
        res.status(404).json({ "message": "discipline not found" });
        return;
    }

    deciplineUpdate.remove();

    cycling.save(function(err, updt) {
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
    getDiscipline:getDiscipline,
    getDisciplines:getDisciplines,
    addDiscipline:addDiscipline,
    deleteDiscipline:deleteDiscipline
};