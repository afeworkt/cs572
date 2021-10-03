const mongoose = require('mongoose');
const Game = mongoose.model('Game');

gamesGetAll = function (req, res) {
    console.log("GET the games");
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
module.exports = {
    gamesGetAll: gamesGetAll,
    getOneGame: getOneGame
}