var app = angular.module('admin_woodworker', ['ui.router', 'ngResource', 'ngAnimate', 'angularFileUpload', 'ngCookies']);

app
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            console.log("state provider");
            $stateProvider
                .state('login', {
                    url: '/login',
                    views: {
                        'content': {
                            templateUrl: 'template/login.html',
                            controller: 'StartController'
                        },
                        'menu': {
                            templateUrl: 'template/menu.html',
                            controller: 'Menu'
                        }
                    }
                })
                .state('app', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: 'template/mainPage.html',
                            controller: 'StartController'
                        },
                        'menu': {
                            templateUrl: 'template/menu.html',
                            controller: 'Menu'
                        }
                    },
                    resolve: {
                        promiseObj2: ['mainService', '$state', function (mainService, $state) {
                            console.log('resolve');
                            return mainService.currentUser()
                                .then(function (user) {
                                    console.log("service return user: ", user);
                                    if (user === undefined) {
                                        return $state.go('login');
                                    }
                                    return "user auth";
                                });
                        }]
                    }
                })

                .state('app.mediaPhoto', {
                    url: 'mediaPhoto/:id',
                    views: {
                        'content@': {
                            templateUrl: 'template/mediaPhoto.html',
                            controller: 'PhotoController'
                        }
                    }
                })
                .state('app.templateEditor', {
                    url: 'templateEditor/:id',
                    views: {
                        'content@': {
                            templateUrl: 'template/templateEditor.html',
                            controller: 'TextController'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        }]);


module.exports = app;