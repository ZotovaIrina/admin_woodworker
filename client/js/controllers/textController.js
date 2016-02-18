var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', function ($scope, $stateParams, textService) {

    var id = $stateParams.id;
    var fileAddress = "resource/template/" + id + ".html";
    textService.getHtml(fileAddress)
        .then(function (response) {
            $scope.orightml = response;
            //    console.log($scope.orightml);
            //console.log('type orightml ', typeof $scope.orightml);
        });
    $scope.sendTemplate = function () {
        console.log($scope.orightml);
    };


}]);
