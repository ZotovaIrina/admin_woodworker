var app = require("../app");


app.service('textService', ['$http', '$q', function ($http, $q) {

    this.getHtml = function (fileAddress) {

           return $http.get(fileAddress)
               .then(function(response) {
                   return response.data;
               }, function(err){
                   return err.data;
               });
    };

    this.setHtml = function(fileAddress){

        return $http.put(fileAddress)
            .then(function(response) {
                return response;
            }, function(err){
                return err;
            });
    };










}]);
