var app = require("../app");

app.controller('TextController', ['$scope', '$stateParams', 'textService', '$http', function ($scope, $stateParams, textService, $http) {

    var id = $stateParams.id;
    var fileAddress = "resource/template/" + id + ".html";
    console.log (fileAddress);
    $http.get(fileAddress).then(function(response) {
        $scope.rawHtml = response.data;
        console.log($scope.rawHtml);
        console.log('type rawHtml ', typeof $scope.rawHtml);
    });

    //textService.getHtml().get({id: id}).$promise
    //    .then(function (response) {
    //        $scope.orightml =response;
    //            console.log($scope.orightml);
    //        console.log('type orightml ', typeof $scope.orightml);
    //    },
    //    function (response) {
    //        $scope.message = "Error: " + response.status + " " + response.statusText;
    //    }
    //
    //);









}]);
