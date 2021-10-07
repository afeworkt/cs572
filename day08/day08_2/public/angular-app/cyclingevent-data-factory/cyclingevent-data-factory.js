angular.module("cyclingEvent").factory("CyclingEventDataFactory", CyclingEventDataFactory);

function CyclingEventDataFactory($http) {
    return {
        getAllCyclingEvents: getAllCyclingEvents,
        getOneCyclingEvent: getOneCyclingEvent
    };
    function getAllCyclingEvents() {
        return $http.get("/api/cyclingevents").then(complete).catch(failed);
    }
    function getOneCyclingEvent(id) {
        return $http.get("/api/cyclingevents/" + id).then(complete).catch(failed);
    }
    function complete(response) {
        // console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}