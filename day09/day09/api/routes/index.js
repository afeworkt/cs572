const express=require('express');
const postsController=require('../controllers/jobopenings.controller');
const controllerReviews=require('../controllers/reviews.controller');
const router=express.Router();

router.route('/').get(postsController.home);

router.route('/jobopenings')
    .get(postsController.getAll)
    .post(postsController.addOne);

router.route('/jobopenings/:id')
    .get(postsController.getOne)
    .put(postsController.updateOne)
    .delete(postsController.deleteOne);
    router.route("/jobopenings/:jobId/reviews")
    .get(controllerReviews.getReviews)
    .post(controllerReviews.addReview);

router.route("/jobopenings/:jobId/reviews/:reviewId")
    .get(controllerReviews.getReview)
    .delete(controllerReviews.deleteReview);

module.exports=router;