var app = require("../app");

app.controller('Menu',['$scope','adminService', function ($scope, adminService) {
    adminService.getSections().then(function(keys){
        $scope.sections = keys;
    });

    adminService.getContents().then(function(contents) {
        $scope.contents = contents;
    });

}]);
