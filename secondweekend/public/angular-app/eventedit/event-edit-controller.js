angular.module('cyclingevent').controller('EventEditController',EventEditController);

function EventEditController(EventDataFactory,$routeParams,$location){
    const vm=this;
    vm.editing=false;
    vm.formdata={};
    // const eventid=$routeParams.eventid;
    vm.getOne = function(eventid){
        EventDataFactory.getOne(eventid).then(function(result){
            vm.formdata=result;
            vm.formdata.startDate= new Date(vm.formdata.startDate);
            vm.formdata.endDate= new Date(vm.formdata.endDate);
            vm.eventid=eventid;
        });
    }
    if($routeParams.eventid){
        vm.editing=true;
         vm.getOne($routeParams.eventid);
    }
    
    vm.addNewEvent=function(){
        console.log(vm.formdata);
        
        EventDataFactory.addNew(vm.formdata).then(
            function(response){
                $location.path('/events');
        });
    }
    vm.updateEvent=function(){
        console.log(vm.formdata);
        
        EventDataFactory.update(vm.eventid,vm.formdata).then(
            function(response){
                $location.path('/events');
            //   $route.('/events');
        });
    }
}
