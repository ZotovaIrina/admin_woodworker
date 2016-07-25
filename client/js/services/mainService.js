var app = require("../app");


app.service('mainService', ['$http', '$q', '$cookies', 'baseURL',
    function ($http, $q, $cookies, baseURL) {

    this.getHtml = function () {
        console.log("service getHtml");
        return $http.get('/login')
            .then(function (responce) {
                console.log(responce);
                return responce.data;
            }, function (err) {
                return err.data;
            });
    };

    this.currentUser = function () {
        console.log("service");
        //$cookies.putObject('user', {"username": "admin", "password": "111"});
        var user = $cookies.getObject('user');
        console.log("get user: ", user);
        return  $q.resolve(user);
    };

    this.logIn = function (user) {
        var URL = baseURL + 'login';
        console.log("service", user);
        return $http.post(URL, {user: user})
            .then(function (response) {
                $cookies.putObject('user', user);
                return response.data;
            })
            .catch(function(error) {
                console.log("get error:", error);
                return $q.reject(error);
            });
    };



}]);
