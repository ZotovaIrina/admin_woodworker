var app = require("../app");


app.service('textService', ['$http', '$q', function ($http, $q) {
    //
    //var contentJson = function () {
    //    var promise = $resource('resource/content.json').get().$promise;
    //
    //    return promise
    //        .then(function (resource) {
    //            if (resource.success) {
    //                return resource.data.content;
    //            } else {
    //                return $q.reject('not success');
    //            }
    //        });
    //
    //};

    this.getHtml = function (fileAddress) {

           return $http.get(fileAddress)
               .then(function(response) {
                   return response.data;
               }, function(err){
                   return err.data;
               });


    };










}]);
