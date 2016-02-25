var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', function ($scope, $stateParams, textService) {

    var id = $stateParams.id;
    var fileAddress = "resource/template/" + id + ".html?_=" + Date.now();
    textService.getHtml(fileAddress)
        .then(function (response) {
            $scope.orightml = response;
            $scope.htmlIsChanged = false;
        });

    $scope.sendTemplate = function () {
        console.log($scope.orightml);
        textService.setHtml(fileAddress)
            .then(function (resourse) {
                if (!resourse.success) {
                    console.log("success");
                    $scope.alert = true;
                    $scope.alertMessage = "Изменения сохранены";
                    $scope.alertColor = "alert-success";
                } else {
                    $scope.alert = true;
                    $scope.alertMessage = "Произошла ошибка";
                    console.log("error");
                    $scope.alertColor = "alert-danger";
                }
            });
    };


}]);
