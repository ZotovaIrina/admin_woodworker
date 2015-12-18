var app = require("../app");

app.controller('PhotoController',['$scope','adminService', function ($scope, adminService) {
   // $scope.images = $scope.contents.room.images;
    $scope.images = adminService.getPhotos('other');
        console.log($scope.images);
}]);
