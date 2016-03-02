var app = require("../app");

app.constant("baseResourceURL", "http://localhost:3000/resource");
app.constant("baseURL", "http://localhost:3000/");



app.service('photoService', ['$resource', '$q', '$http', 'baseResourceURL', function ($resource, $q, $http, baseResourceURL) {


    var contentJson = function () {
        var promise = $resource(baseResourceURL + '/content.json').get().$promise;

        return promise
            .then(function (resource) {
                if (resource.success) {
                    return resource.data.content;
                } else {
                    return $q.reject('not success');
                }
            });

    };

    var info = contentJson();

    //get data from json-file
    this.getContents = function () {
        return info;
    };

    //get data from json-file for specific page
    this.getSections = function () {
        return info.then(function (contents) {
            return Object.keys(contents);
        });

    };

    //array objects with image.name and image.caption
    this.getPhoto = function(index){
        return info.then(function(contents){
            return contents[index].images;
        });
    };


    this.setContents = function(){

        return $resource(baseResourceURL + '/content.json/data/content/:id', null, {'update': {method: 'PUT'}});
    };


}]);
