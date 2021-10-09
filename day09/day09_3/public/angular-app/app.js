angular.module("meanGames",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angular-app/main/welcome.html"
    }).when("/games",{
        templateUrl:"angular-app/game-list/games.html",
        controller:"GamesController",
        controllerAs:"vm"
    }).when("/game/:gameId",{
        templateUrl:"angular-app/game/game.html",
        controller:"GameController",
        controllerAs:"vm"
    });
}
