angular.module('jobOpenings').controller('JobOpeningEditController', JobOpeningEditController)

function JobOpeningEditController(JobsDataFactory, $location, $routeParams) {

    const vm = this;

    vm.title = "Job Detail";

    vm.formdata = {};
    vm.formdata.skills = "";

    JobsDataFactory.getOne($routeParams.id).then(function(response) {
        vm.formdata = response;

        vm.formdata.skills = vm.formdata.skills?vm.formdata.skills.join(','):'';
        console.log(vm.formdata);
        console.log(vm.formdata.skills);
        vm.formdata.postDate = new Date(response.postDate);

    });


    vm.updateJob = function(id) {
        console.log(vm.formdata.skills);
        let skills = vm.formdata.skills.split(",");
        vm.formdata.skills = skills;
        console.log(vm.formdata);
        JobsDataFactory.updateJob(id, vm.formdata).then(function(response) {
            $location.path('/jobopenings');
        });

    }
}