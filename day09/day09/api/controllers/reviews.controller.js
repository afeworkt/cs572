const mongoose = require('mongoose');

const JobOpening = mongoose.model('JobOpening');

getReviews = function(req, res) {

    console.log(`Getting a jobOpening reviews`);

    JobOpening.findById(req.params.jobId).select('reviews').exec(function(err, doc) {
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
    console.log(`get jobOpening review by review id ${req.params.reviewId}`);

    JobOpening.findById(req.params.jobId).select('reviews').exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "JobOpening review not found!" };
        } else {
            response.message = doc.reviews.id(req.params.reviewId);
        }

        res.status(response.status).json(response.message);
    });
}

addReview = function(req, res) {

    console.log("Adding new review");
    console.log(req.params)

    JobOpening.findById(req.params.jobId).select('reviews').sort({date: -1}).exec(function(err, doc) {
        console.log("jobOpening for review");
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "JobOpening not found to add review" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        _addReview(doc, req, res);
    });
};

function _addReview(jobOpening, req, res) {

    console.log("adding review");

    const review = {
        nameOfReviewer: req.body.nameOfReviewer,
        reviewText: req.body.reviewText,
        date:req.body.date
    }
    if (!jobOpening.reviews || jobOpening.reviews==='') {
        jobOpening.reviews = [];
    }
   
    jobOpening.reviews.push(review);
    for (let index = 0; index < jobOpening.reviews.length; index++) {
        if(jobOpening.reviews[index]===''){
         jobOpening.reviews.splice(index,1);
        }
     }
 
    jobOpening.save(function(err, updated) {

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
    console.log('deliting review from jobOpening');

    JobOpening.findById(req.params.id).select("reviews").exec(function(err, doc) {

        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "jobOpening not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        }
        _deleteReview(doc, req, res);
    });
}

function _deleteReview(jobOpening, req, res) {

    const reviewToUpdate = jobOpening.reviews.id(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "review not found" });
    }

    reviewToUpdate.remove();

    jobOpening.save(function(err, updt) {
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