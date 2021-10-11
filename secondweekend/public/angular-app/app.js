angular.module('cyclingevent',['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'angular-app/home/welcome.html'
    }).when('/events/',{
        templateUrl:'angular-app/eventlist/event-list.html',
        controller:'EventListController',
        controllerAs:'vm'
    }).when('/events/:eventid',{
        templateUrl:'angular-app/eventdetail/event-detail.html',
        controller:'EventDetailController',
        controllerAs:'vm',
        
    }).when('/event',{
        templateUrl:'angular-app/eventedit/event-edit.html',
        controller:'EventEditController',
        controllerAs:'vm',
        
    }).when('/event/:eventid',{
        templateUrl:'angular-app/eventedit/event-edit.html',
        controller:'EventEditController',
        controllerAs:'vm',
        
    }).when('/register',{
        templateUrl:'angular-app/user-signup/signup.html',
        controller:'SignupController',
        controllerAs:'vm',
        
    }).otherwise({
        redirectTo:'/'
    });
}