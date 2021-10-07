angular.module("cyclingEvent",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angular-app/main/welcome.html"
    }).when("/cyclingevents",{
        templateUrl:"angular-app/cyclingevent-list/cyclingevents.html",
        controller:"CyclingEventsController",
        controllerAs:"vm"
    }).when("/cyclingevent/:cyclingEventId",{
        templateUrl:"angular-app/cyclingevent/cyclingevent.html",
        controller:"CyclingEventController",
        controllerAs:"vm"
    });
}
