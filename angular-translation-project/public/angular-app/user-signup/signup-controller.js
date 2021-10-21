angular.module('meanGames').controller('SignupController',SignupController);

function SignupController(UserDataFactory,$location){
    const vm=this;
    vm.editing=false;
    vm.isSubmitted = false;
    vm.message = '';
    vm.formdata = {
    };
    vm.signup=function(){
        if (!vm.myForm.$valid) {
            vm.isSubmitted = true;
            vm.message='Please enter a valid info';
        }
        else {
        console.log(vm.formdata);
        
        UserDataFactory.register(vm.formdata).then(
            function(response){
                console.log(response);
                vm.message='';
                $location.path('/');
        }).catch(function(error){
            vm.message='User already registered';
        });
        }
    }
}
