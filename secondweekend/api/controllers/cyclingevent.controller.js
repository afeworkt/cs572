const mongoose = require('mongoose');
const Cycling = mongoose.model('Cycling');

getAllEvents = function (req, res) {
    console.log("GET all cycling events");
    
    var offset = 0;
        var count = 5,maxCount=10;
        if (req.query) {
            // if(req.query.lat && req.query.lng){
            //     runGeoQuery(req, res);
            //     return;
            // }
            if(req.query.offset) {
                offset = parseInt(req.query.offset, 10);
            }
            if (req.query.count) {
                count = parseInt(req.query.count)>maxCount?maxCount:parseInt(req.query.count);
            }
        }
        if(isNaN(count)){
            count=5;
        }
        if(isNaN(offset)){
            offset=0;
        }
    
       Cycling.count().exec(function(cerr,countdata){
            if(cerr){
                res.status(500).json(err);
            }else{
                const totalCount=countdata;
            Cycling.find().limit(count).skip(offset).sort([['startDate', -1]]).exec(function(err,docs){
                if(err){
                    res.status(500).json(err);
                }else{
                    if(!docs){
                        res.status(200).json({count:0,data:[]});
                    }else{
                        res.status(200).json({count:totalCount,data:docs});
                    }
                }
            });
            }
        });
}

getOneCyclingEvent = function (req, res) {
    let cyclingEventId = req.params.cyclingEventId;
    if (!mongoose.isValidObjectId(cyclingEventId)) {
        res.status(400).json({ "message": "Error: Please enter a valid cycling event Id" });
        return;
    }
    Cycling.findById(cyclingEventId, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Cyclings" });
        }
        else {
            if (!data) {
                console.log(err);
                res.status(404).json({ message: `Cannot find Cycling Event with Id:${cyclingEventId}` });
            } else {
                res.status(200).json(data);
            }
        }
    });

}
addOneCyclingEvent = function (req, res) {
    const newCyclingEvent = {
        name: req.body.name,
        country: req.body.country,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        disciplines:[]
    };

    Cycling.create(newCyclingEvent, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
        }
    });
}

updateCyclingEvent = function (req, res) {
    console.log(`Update cyclingEvent`);
    let cyclingEventId = req.params.cyclingEventId;
    Cycling.findById(cyclingEventId).select("-disciplines").exec(function (err, doc) {
        if (err) {
            res.status(500).json({ "message": err });
            return;
        } else {
            if (!doc) {
                res.status(404).json({ "message": `Cannot update Cycling event. Cycling Event with id ${cyclingEventId} not found!` });
                return;
            }
            else {
                _updateCyclingEvent(doc, req, res);
            }
        }
    });
}
function _updateCyclingEvent(doc, req, res) {

    doc.name = req.body.name;
    doc.country = req.body.country;
    doc.startDate = req.body.startDate;
    doc.endDate = req.body.endDate;
    doc.save(function (err, updatedCycling) {
        if (err) {
            res.status(500).json({ "message": err });
        } else {
            res.status(204).json(doc);
        }
    });
};
deleteCyclingEvent =function(req,res){
    let cyclingEventId = req.params.cyclingEventId;
    console.log("deleting event with id: "+cyclingEventId);
    Cycling.deleteOne({ _id: cyclingEventId }, function(err,doc) {
        if (err) {
            res.status(500).json({message: err});
        } else {
                res.status(200).json({ "message": `Cycling event with id ${cyclingEventId} successfully deleted!` });
          }
    });
}

module.exports = {
    getAllEvents: getAllEvents,
    getOneCyclingEvent: getOneCyclingEvent,
    addOneCyclingEvent: addOneCyclingEvent,
    updateCyclingEvent:updateCyclingEvent,
    deleteCyclingEvent:deleteCyclingEvent
}