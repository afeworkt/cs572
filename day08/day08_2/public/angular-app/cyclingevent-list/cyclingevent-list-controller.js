angular.module('cyclingEvent').controller("CyclingEventsController",CyclingEventsController);
function CyclingEventsController(CyclingEventDataFactory){
    const vm=this;
    vm.title="Recent cycling events";
    CyclingEventDataFactory.getAllCyclingEvents().then(function(result) {
        vm.cyclingEvents=result;
    })

}