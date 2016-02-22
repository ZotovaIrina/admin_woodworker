var app = require("../app");

app.directive('alertDirective', function () {
    return {

        restrict: 'E',
        template: '<div class="alert alert-delete" ng-class="color" role="alert" ng-if="show"><p>{{massage}}</p></div>',
        scope: {
            massage: '=',
            color: '=',
            show: '='
        },
        link: function (scope, element, attrs) {         //use for work with any interactivity, manipulate with DOM. Event, for example
            scope.$watch('color', function (value) {
                scope.color = value;
            });

        },
        controller: function ($scope, $timeout) {
            $scope.$watch('show', function () {
                if ($scope.show === true) {
                    $timeout(function () {
                        $scope.show = false;
                        $scope.massage = "";
                    }, 1500);
                }
            });
        }


    };
});