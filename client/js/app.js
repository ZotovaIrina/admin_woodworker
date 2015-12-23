var app = angular.module('admin_woodworker', ['ui.router', 'ngResource', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'template/start.html'
                    },
                    'menu': {
                        templateUrl: 'template/menu.html',
                        controller: 'Menu'
                    }
                }
            })
            .state('app.mediaPhoto', {
                url:'mediaPhoto/:id',
                views: {
                    'content@': {
                        templateUrl : 'template/mediaPhoto.html',
                        controller  : 'PhotoController'
                    }
                }
            })
            .state('app.templateEditor', {
                url:'templateEditor/:id',
                views: {
                    'content@': {
                        templateUrl : 'template/templateEditor.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


module.exports = app;