angular.module("jobOpenings",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'angular-app/home/welcome.html'
    }).when('/jobopenings',{
        templateUrl:'angular-app/jobopenings/list.html',
        controller:'JobOpeningsController',
        controllerAs:'vm',

    }).when('/jobopenings/:id/edit',{
        templateUrl:'angular-app/jobopening-edit/job-opening-edit.html',
        controller:'JobOpeningEditController',
        controllerAs:'vm',

    }).when('/jobopening/:id',{
        templateUrl:'angular-app/jobopening/jobopening.html',
        controller:'JobOpeningController',
        controllerAs:'vm',

    });
}
