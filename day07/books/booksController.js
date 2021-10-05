angular.module("myApp").controller("BooksController",BooksController);

function BooksController(BooksFactory){
    const vm =this;
    vm.name="Books";
    BooksFactory.getAllBooks().then(function(result){
        vm.books=result;
        // console.log(result);
       }).catch(function(err){
            console.log(err);
       });
}