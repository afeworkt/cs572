angular.module('jobOpenings').controller('JobOpeningController',JobOpeningController);

function JobOpeningController(JobsDataFactory,$routeParams,$route){
    const vm=this;
    const id=$routeParams.id;
    vm.formdata={};
    JobsDataFactory.getOne(id).then(function(result){
        vm.job=result;
    });
    vm.addReview = function(id) {
        console.log(vm.formdata);
        console.log($routeParams.id);
        // id=$routeParams.id;
        JobsDataFactory.addReview($routeParams.id,vm.formdata).then(function(response) {
            $route.reload();
        });
    }
}