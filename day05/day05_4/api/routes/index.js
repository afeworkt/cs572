const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controller.js"); 
const controllerPublisher= require("../controllers/publisher.controller"); 

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

module.exports = router;