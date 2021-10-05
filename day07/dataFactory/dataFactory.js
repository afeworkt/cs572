angular.module("myApp").factory("BooksFactory", BooksFactory);

function BooksFactory($http) {
    const apiUrl="https://reststop.randomhouse.com/resources/works/";
    return {
        getAllBooks: getAll,
        getOneBook: getOne
    };
     
    function getOne(bookId){
       return  $http.get(apiUrl+bookId)
        .then(getOneComplete).catch(failed);
    }
    function getAll() {
       return $http.get(apiUrl+"?start=0&max=20&expandLevel=1&search=Grisham")
            .then(complete).catch(failed);
    }
    function complete(response){
        return response.data.work;
    }
    function failed(err){
        return err;
    }
    function getOneComplete(response){
        console.log(response.data);
        return response.data;
    }
}