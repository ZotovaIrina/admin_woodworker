var app = require("../app");

app.controller('Menu',['$scope','photoService', function ($scope, photoService) {
    photoService.getSections().then(function(keys){
        $scope.sections = keys;
    });

    photoService.getJson().then(function(contents) {
        $scope.contents = contents;
    });

}]);
