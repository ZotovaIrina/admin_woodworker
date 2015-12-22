var app = require("../app");

app.controller('PhotoController',['$scope','adminService', function ($scope, adminService) {
       adminService.getContents().then(function(contents){
              $scope.images = contents.room.images;
              console.log($scope.images);
       });

}]);
