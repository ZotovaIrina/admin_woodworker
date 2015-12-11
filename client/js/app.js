
var app = angular.module('admin_woodworker', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/start.html'
            }).
            when('/mediaPhoto', {
                templateUrl: 'template/mediaPhoto.html',
                controller: 'fotoController'

            }).
            when('/templateEditor', {
                templateUrl: 'template/templateEditor.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);





module.exports = app;