var app = require("../app");

app.controller('StartController', ['$scope', 'mainService','$state', function ($scope, mainService, $state) {

    console.log("start controller");
    mainService.getHtml()
    .then(function (responce) {
        console.log("Controller get data");
        $scope.content = responce;
    });



    //
    //var id = $stateParams.id;
    //var fileAddress = "/template/" + id;
    //textService.getHtml(fileAddress)
    //    .then(function (response) {
    //        $scope.orightml = response;
    //        $scope.htmlIsChanged = false;
    //    });
    //
    //$scope.sendTemplate = function () {
    //    console.log($scope.orightml);
    //    var setData = {"data": $scope.orightml};
    //    textService.setHtml(fileAddress, setData)
    //        .then(function (resource) {
    //            if (resource.success) {
    //                $scope.alert = true;
    //                $scope.alertMessage = "Изменения сохранены";
    //                $scope.alertColor = "alert-success";
    //            } else {
    //                $scope.alert = true;
    //                $scope.alertMessage = "Произошла ошибка "+ resource.status;
    //                console.log("Error status: ", resource.status, resource.data);
    //                $scope.alertColor = "alert-danger";
    //            }
    //        });
    //};


}]);
