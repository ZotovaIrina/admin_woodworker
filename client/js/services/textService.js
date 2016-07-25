var app = require("../app");


app.service('textService', ['$http', '$q','$cookies', '$state', function ($http, $q, $cookies, $state) {

    this.getHtml = function (fileAddress) {

        return $http.get(fileAddress)
            .then(function (responce) {
                return responce.data;
            }, function (err) {
                return err.data;
            });
    };

    this.setHtml = function (fileAddress, data) {
        console.log("service");
        var user = $cookies.get('user');
        console.log("get user: ", user);
        if(user === undefined) {
            console.log("user undefined");
            var error = {
                status: 401,
                statusText: "user underfined"
            };
            return $q.reject(error);
        } else {
            return $http.put(fileAddress, data, {headers: {"user": user}})
                .then(function (responce) {
                    console.log("success");
                    return responce.data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
        }

    };


}]);
