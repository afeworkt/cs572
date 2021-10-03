const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controller.js"); 

router.route("/games").get(controllerGames.gamesGetAll); 
router.route("/games/:gameId").get(controllerGames.getOneGame); 
router.route("/games").post(controllerGames.addOneGame); 
router.route("/games/:gameId").put(controllerGames.updateGame); 
router.route("/games/:gameId").delete(controllerGames.deleteGame); 

module.exports = router;