angular.module('meanGames').controller("GamesController",GamesController);
function GamesController(GameDataFactory,$route){
    const vm=this;
    vm.title="Games List";
    vm.offset=0;
    vm.limit=5;
    vm.getAllGames=function(offset,limit){
        vm.offset=offset;
        vm.limit=limit;
        GameDataFactory.getAllGames(offset,vm.limit).then(function(result) {
            vm.games=result;
            if(result.length==0){
                vm.offset-=5;
            }
        }).catch(function(error){
            vm.offset=0;
        })
    }
    vm.getAllGames(vm.offset,vm.limit);
    vm.deleteGame = function(gameId) {
        console.log(gameId);
        GameDataFactory.deleteOneGame(gameId).then(
            function(response){
               vm.deleted=true;
               $route.reload();
        });
    }
    vm.next = function() {
        vm.offset+=5;
        vm.getAllGames(vm.offset,vm.limit);
    }
    vm.previous = function() {   
        if(vm.offset>0){
        vm.offset-=5;
        vm.getAllGames(vm.offset,vm.limit);

        }
    }
}