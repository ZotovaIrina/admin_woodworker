var app = require("../app");


app.service('textService', ['$http', '$q', function ($http) {

    this.getHtml = function (fileAddress) {

        return $http.get(fileAddress)
            .then(function (responce) {
                return responce.data;
            }, function (err) {
                return err.data;
            });
    };

    this.setHtml = function (fileAddress, data) {

        return $http.put(fileAddress, data)
            .then(function (responce) {
                return responce.data;
            })
            .catch(function (err) {
                return err;
            });

    };


}]);
