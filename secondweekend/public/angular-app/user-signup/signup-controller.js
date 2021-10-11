angular.module('cyclingevent').controller('SignupController',SignupController);

function SignupController(UserDataFactory,$location){
    const vm=this;
    vm.editing=false;
    vm.formdata={};
    
    vm.signup=function(){
        console.log(vm.formdata);
        
        UserDataFactory.register(vm.formdata).then(
            function(response){
                // console.log(response);
                $location.path('/events');
        });
    }
}
