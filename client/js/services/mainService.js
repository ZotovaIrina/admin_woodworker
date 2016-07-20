var app = require("../app");


app.service('mainService', ['$http', '$q', '$cookies', function ($http, $q, $cookies) {

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
        var user = $cookies.get('user');
        console.log("get user: ", user);
        return  $q.resolve(user);
    };



}]);
