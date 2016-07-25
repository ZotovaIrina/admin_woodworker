var app = require("../app");

app.controller('loginController', ['$scope', 'mainService', '$state', function ($scope, mainService, $state) {

    $scope.login = {};
    $scope.alert = false;
    $scope.alertMessage = "";
    $scope.alertColor = "alert-warning";

    $scope.sendLogin = function () {

        mainService.logIn($scope.login)
            .then(function(responce) {
                console.log("controller get responce: ", responce);
                $state.go('app');
            })
            .catch(function(error) {
                console.log("controller get error");
                $scope.alert = true;
                $scope.alertMessage = "Произошла ошибка: " + error.status + " " + error.statusText;
                $scope.alertColor = "alert-danger";
            });
    };


}]);