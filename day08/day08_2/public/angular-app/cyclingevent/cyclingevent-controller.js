angular.module('cyclingEvent').controller("CyclingEventController", CyclingEventController);
function CyclingEventController(CyclingEventDataFactory, $routeParams) {
    const vm = this;
    vm.title="Detail about cycling event"
    const id = $routeParams.cyclingEventId;
    
    CyclingEventDataFactory.getOneCyclingEvent(id)
        .then(function (response) {
            vm.cyclingevent = response;
        });
}