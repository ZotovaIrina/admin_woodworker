var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', function ($scope, $stateParams, textService) {

    var id = $stateParams.id;
    var fileAddress = "resource/template/" + id + ".html";
    textService.getHtml(fileAddress)
        .then(function(response) {
            $scope.rawHtml = response;
                console.log($scope.rawHtml);
            console.log('type rawHtml ', typeof $scope.rawHtml);
        });












}]);
