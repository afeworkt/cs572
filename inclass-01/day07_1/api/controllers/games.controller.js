const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const runGeoSerch=function(req,res){
    const lat=parseFloat(req.query.lat);
    const lng=parseFloat(req.query.lng);
    const dist=parseFloat(req.query.dist) || 1000;

    const query={
        "publisher.location":{
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates: [lng,lat]
                },
                $maxDistance:dist,
                $minDistance:0
            }
        }
    }
    Game.find(query).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Games" });
        } else {
            console.log("Found games");
            res.status(200).json(docs);
            return;
        }
    });
}

const gamesGetAll = function (req, res) {
    console.log("GET the games");
    if(req.query && req.query.lng  && req.query.lat){
        runGeoSerch(req,res);
        return;
    }
    const maxAllowedCount = 9, defaultCount = 6, offset = 0;

    let count = defaultCount;

    if (req.query) {
        if (req.query.count) {
            count = parseInt(req.query.count) > maxAllowedCount ? maxAllowedCount : parseInt(req.query.count);
        }
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }
    }

    Game.find().limit(count).skip(offset).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Games" });
        } else {
            console.log("Found games");
            res.status(200).json(docs);
        }
    });
}

getOneGame = function (req, res) {
    let gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Error: Please enter a valid game Id" });
        return;
    }
    Game.findById(gameId, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": "Error finding Games" });
        }
        else {
            if (!data) {
                console.log(err);
                res.status(404).json({ message: `Cannot find Game with Id:${gameId}` });
            } else {
                res.status(200).json(data);
            }
        }
    });

}
addOneGame = function (req, res) {
    const newGame = {
        title: req.body.title,
        year: parseInt(req.body.year),
        rate: parseInt(req.body.rate),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        designers: req.body.designers
    };

    Game.create(newGame, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
        }
    });
}

updateGame = function (req, res) {
    console.log(`Update game`);
    let gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, doc) {
        if (err) {
            res.status(500).json({ "message": err });
            return;
        } else {
            if (!doc) {
                res.status(404).json({ "message": `Cannot update game. Game with id ${gameId} not found!` });
                return;
            }
            else {
                _updateGame(doc, req, res);
            }
        }
    });
}
function _updateGame(doc, req, res) {

    doc.title = req.body.title;
    doc.year = parseInt(req.body.year);
    doc.rate = parseInt(req.body.rate);
    doc.price = parseFloat(req.body.price);
    doc.minPlayers = parseInt(req.body.minPlayers);
    doc.maxPlayers = parseInt(req.body.maxPlayers);
    doc.minAge = parseInt(req.body.minAge);
    doc.designers = req.body.designers;
    doc.save(function (err, updatedGame) {
        if (err) {
            res.status(500).json({ "message": err });
        } else {
            res.status(204).json(doc);
        }
    });
};
deleteGame =function(req,res){
    let gameId = req.params.gameId;
    console.log("deleting game with id: "+gameId);
    Game.findByIdAndRemove(gameId, function(err, doc) {
        if (err) {
            res.status(500).json({message: err});
        } else {
                res.status(404).json({ "message": `Game with id ${gameId} successfully deleted!` });
          }
    });
}

module.exports = {
    gamesGetAll: gamesGetAll,
    getOneGame: getOneGame,
    addOneGame: addOneGame,
    updateGame:updateGame,
    deleteGame:deleteGame
}