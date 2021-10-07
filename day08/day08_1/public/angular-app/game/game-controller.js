angular.module('meanGames').controller("GameController", GameController);
function GameController(GameDataFactory, $routeParams) {
    const vm = this;
    const id = $routeParams.gameId;
    
    GameDataFactory.getOneGame(id)
        .then(function (response) {
            vm.game = response;
            console.log(response.rate);
            vm.stars=_getStarRating(response.rate);
        });

        function _getStarRating(stars) {
            return new Array(stars);
         }
}