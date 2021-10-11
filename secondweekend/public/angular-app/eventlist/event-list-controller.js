angular.module('cyclingevent').controller('EventListController',EventListController);

function EventListController(EventDataFactory,$route){
    const vm=this;
    vm.offset=0;
    vm.limit=5;
    vm.searchText='';
    vm.getAll = function(offset){
        vm.offset = offset;
        EventDataFactory.getAll(vm.offset,vm.limit).then(function(result){
            vm.events=result.data;
            vm.count=result.count;
            vm.pageSize=Math.ceil(vm.count/vm.limit);
        });
    }
   
    vm.getAll(vm.offset);

    vm.searchdata = {}
    vm.newgame = {}

    vm.search = function() {
        console.log(vm.searchdata);
        EventDataFactory.search(vm.searchdata.lat, vm.searchdata.lng, vm.searchdata.dist).then(
            function(response){
                vm.games=response.data;
                vm.count=response.count;
            console.log(response);
        });
    }
    vm.addEvent=function(){
        console.log(vm.newgame);
        EventDataFactory.addGame(vm.newgame).then(
            function(response){
              getAll();
        });
    }
    vm.deleteEvent = function(eventid) {
        console.log(eventid);
        EventDataFactory.deleteOne(eventid).then(
            function(response){
               vm.deleted=true;
               $route.reload();
        });
    }
    vm.filterData = function (item) {
        let searcht=vm.searchText.trim().toUpperCase();
        return searcht==='' || ( item.name.toUpperCase().indexOf(searcht) !== -1 || item.country.toUpperCase().indexOf(searcht) !== -1);
    }
}

