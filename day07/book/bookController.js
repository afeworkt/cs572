angular.module("myApp").controller("BookController",BookController);

function BookController(BooksFactory,$routeParams){
    const vm =this;
    let bookId=$routeParams.bookId;
    vm.name="About";
    BooksFactory.getOneBook(bookId).then(function(result){
        vm.book=result;
        console.log(result);
       }).catch(function(err){
            console.log(err);
       });
}