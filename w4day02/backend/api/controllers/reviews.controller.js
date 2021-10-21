const mongoose = require('mongoose');

const Game = mongoose.model('Game');

getReviews = function(req, res) {

    console.log(`Getting a game reviews`);

    Game.findById(req.params.gameId).select('reviews').exec(function(err, doc) {
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
            response.message = doc.reviews;
        }

        res.status(response.status).json(response.message);
    });
};

getReview = function(req, res) {
    console.log(`get game review by review id ${req.params.reviewId}`);

    Game.findById(req.params.gameId).select('reviews').exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Game review not found!" };
        } else {
            response.message = doc.reviews.id(req.params.reviewId);
        }

        res.status(response.status).json(response.message);
    });
}

addReview = function(req, res) {

    console.log("Adding new review");

    Game.findById(req.params.gameId).select('reviews').exec(function(err, doc) {
        console.log("game for review", doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Game not found to add review" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        _addReview(doc, req, res);
    });
};

function _addReview(game, req, res) {

    console.log("adding review");

    const review = {
        name: req.body.name,
        review: req.body.review,
        rating:req.body.rating
    }
    if (!game.reviews || game.reviews==='') {
        game.reviews = [];
    }
   
    game.reviews.push(review);
    for (let index = 0; index < game.reviews.length; index++) {
        if(game.reviews[index]===''){
         game.reviews.splice(index,1);
        }
     }
 
    game.save(function(err, updated) {

        const response = {
            status: 500,
            message: err
        }
        if (updated) {
            response.status = 201;
            response.message = updated.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

deleteReview = function(req, res) {
    console.log('deliting review from game');

    Game.findById(req.params.gameId).select("reviews").exec(function(err, doc) {

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
        _deleteReview(doc, req, res);
    });
}

function _deleteReview(game, req, res) {

    const reviewToUpdate = game.reviews.id(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "review not found" });
    }

    reviewToUpdate.remove();

    game.save(function(err, updt) {
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
    getReview:getReview,
    getReviews:getReviews,
    addReview:addReview,
    deleteReview:deleteReview
};