var app = require("../app");

app.controller('Menu',['$scope','photoService', function ($scope, photoService) {


    photoService.getJson().then(function(contents) {
        $scope.contents = contents;
        $scope.sections = Object.keys(contents);
    });
}]);
