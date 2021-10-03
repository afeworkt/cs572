const mongoose = require('mongoose');

const Game = mongoose.model('Game');

getGamePublisher = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Get game publisher by gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 200, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", gameId);
            response.status = 404; response.message = { "message": "Game ID not found" + gameId };
        } else {
            response.message = game.publisher ? game.publisher : [];
        }
        res.status(response.status).json(response.message);
    });
};

addGamePublisher = function (req, res) {

    console.log("creating publisher");

    Game.findById(req.params.gameId).select('publisher').exec(function (err, doc) {
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Your requested unavailable resource" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        _addGamePublisher(doc, req, res);
    });
};

function _addGamePublisher(game, req, res) {

    console.log("adding publisher", req.body);

    game.publisher = {};
    game.publisher.location = {};

    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;

    console.log(game.publisher);

    game.save(function (err, updatedGame) {
        const response = {
            status: 500,
            message: err
        }
        if (updatedGame) {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

updateGamePublisher = function (req, res) {
    console.log(`Updating game publisher with id ${req.params.gameId}`);

    Game.findById(req.params.gameId).select("publisher").exec(function (err, doc) {
        const response = {
            status: 200
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "game not found!" };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        };

        _updateGamePublisher(doc, req, res);
    });
};

function _updateGamePublisher(game, req, res) {

    console.log("still updating publisher");

    game.publisher.name = req.body.name;

    game.publisher.country = req.body.country;

    game.save(function (err, updt) {
        const response = {
            status: 500,
            message: err
        }
        if (updt) {
            response.status = 204;
            response.message = updt;
        }
        res.status(response.status).json(response.message);
    });
};

deletePublisher = function (req, res) {
    console.log('delete publisher of game with id: ' + req.params.gameId);

    Game.findById(req.params.gameId).select("publisher").exec(function (err, doc) {

        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "game not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        }
        _deletePublisher(doc, req, res);
    });
}

function _deletePublisher(game, req, res) {
    game.publisher.remove();

    game.save(function (err, updt) {
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
    getGamePublisher:getGamePublisher,
    addGamePublisher:addGamePublisher,
    updateGamePublisher:updateGamePublisher,
    deletePublisher:deletePublisher
}