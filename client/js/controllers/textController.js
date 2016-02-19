var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', function ($scope, $stateParams, textService) {

    var id = $stateParams.id;
    var fileAddress = "resource/template/" + id + ".html";
    textService.getHtml(fileAddress)
        .then(function (response) {
            $scope.orightml = response;
            //    console.log($scope.orightml);
        });
    $scope.sendTemplate = function () {
        console.log($scope.orightml);
        textService.setHtml(fileAddress)
            .then(function (resourse) {
                if (resourse.success) {
                    console.log("success");
                    //$scope.alert = true;
                    //$scope.alertMessage = "Фото удалено";
                    //$scope.alertCollor = "alert-warning";
                    //$timeout(function () {
                    //    $scope.alert = false;
                    //    $scope.alertCollor = "";
                    //}, 1500);
                } else {
                    console.log("error");
                    //$scope.alert = true;
                    //$scope.alertMessage = "Произошла ошибка";
                    //$scope.alertCollor = "alert-danger";
                    //$timeout(function () {
                    //    $scope.alert = false;
                    //    $scope.alertCollor = "";
                    //}, 1700);
                }
            });
    };


}]);
