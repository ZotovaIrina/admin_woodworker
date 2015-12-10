var app = require("../app");

app.controller('SideMenu', ['$scope', '$resource', function ($scope, $resource) {
    var contentJson = $resource('resource/content.json').get().$promise;
    contentJson.then(
        function onSuccess(resource) {
            if (resource.success) {
                var contents = resource.data.content;
                $scope.contents = contents;
                console.log(contents);
                $scope.sections = Object.keys(contents);

            }
        },
        function onError() {
            console.error(arguments);
        }
    );

}]);
