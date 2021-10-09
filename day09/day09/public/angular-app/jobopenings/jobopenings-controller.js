angular.module('jobOpenings').controller('JobOpeningsController',JobOpeningsController);

function JobOpeningsController(JobsDataFactory,$route){
    const vm=this;
    vm.jobs=[];
    vm.formdata = {};
    vm.total=5;
    vm.offset=0;
    JobsDataFactory.getAll(5,0).then(function(result){
        vm.jobs=result;
    });

    vm.addJob = function() {
        let skills = vm.formdata.skills.split(',');
        vm.formdata.skills = skills;

        console.log('creating', vm.formdata);

        JobsDataFactory.addJob(vm.formdata).then(function(response) {
            $route.reload();

        });
    }

    vm.deleteJob = function(id) {
        console.log('deleting', id);
        JobsDataFactory.deleteJob(id).then(function(response) {
            console.log(response);
            $route.reload();
        });
    }
}