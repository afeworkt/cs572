angular.module('meanGames').controller('GameEditController', GameEditController);

function GameEditController(GameDataFactory, $routeParams, $location) {
    const vm = this;
    vm.editing = false;
    vm.isSubmitted = false;
    vm.message = {content:'',success:false};
    vm.formdata = {
    };
    vm.getOne = function (gameId) {
        GameDataFactory.getOneGame(gameId).then(function (result) {

            vm.formdata = result;
            vm.gameId = gameId;
        });
    }
    if ($routeParams.gameId) {
        vm.editing = true;
        vm.getOne($routeParams.gameId);
    }

    vm.addNewGame = function () {
        if (!vm.myForm.$valid) {
            vm.isSubmitted = true;
            vm.message.content='please fill enter a valid info';
            vm.message.success=false;
        }
        else {
            console.log(vm.formdata);

            GameDataFactory.addOneGame(vm.formdata).then(
                function (response) {
                    // $location.path('/games');
                    vm.message.content = 'New game successfully created!';
                    vm.message.success=true;
                }).catch(function (error) {
                    vm.message.content = 'Unable to create new game';
                    vm.message.success=false;
                });
        }
    }
    vm.updateGame = function () {
        if (!vm.myForm.$valid) {
            vm.isSubmitted = true;
            vm.message.content='Please enter a valid info';
            vm.message.success=false;
        }
        else {
            console.log(vm.formdata);

            GameDataFactory.updateOneGame(vm.gameId, vm.formdata).then(
                function (response) {
                    // $location.path('/games');
                    console.log(response);
                    vm.message.content = 'Game successfully updated!';
                    vm.message.success=true;
                }).catch(function (error) {
                    console.log(error);
                    vm.message.content = 'Unable to update game';
                    vm.message.success=false;
                });
        }
    }
}
