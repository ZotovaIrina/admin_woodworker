var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', function ($scope, $stateParams, textService) {

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
                if (resource.success) {
                    $scope.alert = true;
                    $scope.alertMessage = "Изменения сохранены";
                    $scope.alertColor = "alert-success";
                } else {
                    $scope.alert = true;
                    $scope.alertMessage = "Произошла ошибка "+ resource.status;
                    console.log("Error status: ", resource.status, resource.data);
                    $scope.alertColor = "alert-danger";
                }
            });
    };


}]);
