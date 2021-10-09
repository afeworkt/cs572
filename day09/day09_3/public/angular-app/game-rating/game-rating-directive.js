angular.module("meanGames").directive("gameRating", GameRating);
function GameRating() {
    return {
        restrict: "EA",
        templateUrl: "angular-app/game-rating/rating.html", 
        bindToController: true,
        controller: "GameController",
        controllerAs: "vm"
    };
}