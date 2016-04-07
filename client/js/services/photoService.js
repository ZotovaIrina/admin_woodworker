var app = require("../app");

app.constant("baseResourceURL", "http://localhost:3000/resource");
app.constant("baseURL", "http://localhost:3000/");



app.service('photoService', ['$resource', '$q', '$http', 'baseResourceURL', 'baseURL', function ($resource, $q, $http, baseResourceURL, baseURL) {


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

//put json file
    this.setContents = function(id, data){
        var url = baseURL+ "photo/"+id;
        console.log("url", url);
        return $http.put(url, data)
            .then(function (responce) {
                return responce.data;
            })
            .catch(function (err) {
                return err;
            });
    };


}]);
