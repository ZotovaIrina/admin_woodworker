var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'adminService', function ($scope, $stateParams, adminService) {
    $scope.src = "resource/photo/big/" + $stateParams.id + "/";
    console.log($scope.id);
    adminService.getContents()
        .then(function (contents) {
            $scope.images = contents[$stateParams.id].images;
            console.log($scope.images);
        })
        .then();

}]);
