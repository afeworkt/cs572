const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controller.js"); 
const controllerPublisher= require("../controllers/publisher.controller"); 
const controllerReviews= require("../controllers/reviews.controller"); 
const controllerUsers= require("../controllers/users.controller"); 

router.route("/games").get(controllerGames.gamesGetAll); 
router.route("/games/:gameId").get(controllerGames.getOneGame); 
router.route("/games").post(controllerGames.addOneGame); 
router.route("/games/:gameId").put(controllerGames.updateGame); 
router.route("/games/:gameId").delete(controllerGames.deleteGame); 
router.route("/games/:gameId/publisher")
      .get(controllerPublisher.getGamePublisher)
      .post(controllerPublisher.addGamePublisher)
      .put(controllerPublisher.updateGamePublisher)
      .delete(controllerPublisher.deletePublisher);

 router.route("/games/:gameId/reviews")
      .get(controllerReviews.getReviews)
      .post(controllerReviews.addReview);

router.route("/games/:gameId/reviews/:reviewId")
      .get(controllerReviews.getReview)
      .delete(controllerReviews.deleteReview);

router.route("/users")
      .post(controllerUsers.addUser);

module.exports = router;