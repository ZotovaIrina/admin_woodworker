var app = require("../app");

app.constant("baseResourceURL", "http://localhost:3000/resource");
app.constant("baseURL", "http://localhost:3000/");



app.service('photoService', ['$resource', '$q', '$http', 'baseResourceURL', 'baseURL', function ($resource, $q, $http, baseResourceURL, baseURL) {

    //get data from json-file
    this.getJson = function () {
        var url = baseURL+ "photo";
        return $http.get(url)
            .then(function (responce) {

                return responce.data.data.content;
            })
            .catch(function (err) {
                return err;
            });
    };

    var info = this.getJson();



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

    //get new photo
    this.delPhoto = function (id, fileName) {
        var url = baseURL+ "photo/" + id + "/photo/" + fileName;
        console.log("delete url: ", url);
        return $http.delete(url)
            .then(function (responce) {
                return responce.data;
            }, function (err) {
                return err.data;
            });
    };


}]);
