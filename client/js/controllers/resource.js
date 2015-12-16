var app = require("../app");

app.controller('ResourseCtrl', ['$scope', '$resource', function ($scope, $resource) {
    var contentJson = $resource('resource/content.json').get().$promise;
    contentJson.then(
        function onSuccess(resource) {
            if (resource.success) {
                var contents = resource.data.content;
                $scope.contents = contents;             //all object for all pages
                $scope.sections = Object.keys(contents);        //object with key = name page


            }
        },
        function onError() {
            console.error(arguments);
        }
    );

}]);


