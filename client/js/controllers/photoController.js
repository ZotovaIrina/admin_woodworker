var app = require("../app");

app.controller('PhotoController',['$scope', function ($scope) {
    $scope.images = $scope.contents.room.images;
    console.log($scope.images);

}]);
