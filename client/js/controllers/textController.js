var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', '$state', 'mainService',
    function ($scope, $stateParams, textService, $state, mainService) {

        var id = $stateParams.id;
        var fileAddress = "/template/" + id;
        textService.getHtml(fileAddress)
            .then(function (response) {
                $scope.orightml = response;
                $scope.htmlIsChanged = false;
            });

        $scope.sendTemplate = function () {
            console.log($scope.orightml);
            var setData = {"data": $scope.orightml};




            textService.setHtml(fileAddress, setData)
                .then(function (resource) {
                    console.log("change save successfully", resource);
                    $scope.alert = true;
                    $scope.alertMessage = "Изменения сохранены" ;
                    $scope.alertColor = "alert-success";
                })
                .catch(function (error) {
                    console.log("catch error", error);
                    if (error.status == 401) {
                        console.log("catch error", error);
                        $state.go('login');
                    } else {
                        console.log("controller get error", error);
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка: " + error.status + " " + error.statusText;
                        $scope.alertColor = "alert-danger";
                    }
                });

        };


    }]);
