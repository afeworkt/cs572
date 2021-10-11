angular.module('cyclingevent').controller('EventDetailController',EventDetailController);

function EventDetailController(EventDataFactory,$routeParams){
    const vm=this;
    // const eventid=$routeParams.eventid;
    const getOne = function(eventid){
        EventDataFactory.getOne(eventid).then(function(result){
            vm.event=result;
        });
    }
   
    getOne($routeParams.eventid);
}
