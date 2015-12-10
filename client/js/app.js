
var app = angular.module('admin_woodworker', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/start.html'
            }).
            when('/mediaFoto', {
                templateUrl: 'template/mediaFoto.html',
                controller: 'fotoController'

            }).
            when('/**', {
                templateUrl: 'template/start.html'
            });
    }]);





module.exports = app;