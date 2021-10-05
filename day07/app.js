angular.module("myApp",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "main/main.html",
        controller:MainController,
        controllerAs: "mainCtrl"
    }).when("/books",{
        templateUrl: "books/books.html",
        controller:BooksController,
        controllerAs: "booksCtrl"
    }).when("/books/:bookId",{
        templateUrl: "book/book.html",
        controller:BookController,
        controllerAs: "bookCtrl"
    }).otherwise({
        redirectTo: '/'
    });
}