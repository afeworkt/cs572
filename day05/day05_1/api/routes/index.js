const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controller.js"); 

router.route("/games").get(controllerGames.gamesGetAll); 
router.route("/games/:gameId").get(controllerGames.getOneGame); 

module.exports = router;