var app = require("../app");


app.service('photoService', ['$resource', '$q', '$http', 'baseResourceURL', 'baseURL', '$cookies', 'Upload',
    function ($resource, $q, $http, baseResourceURL, baseURL, $cookies, Upload) {

        //get data from json-file
        this.getJson = function () {
            var url = baseURL + "photo";
            return $http.get(url)
                .then(function (responce) {
                    return responce.data.data.content;
                })
                .catch(function (err) {
                    return err;
                });
        };

        var info = this.getJson();

        //array objects with image.name and image.caption
        this.getPhoto = function (index) {
            return info.then(function (contents) {
                return contents[index].images;
            });
        };


//put json file
        this.setContents = function (id, data) {
            var user = $cookies.get('user');
            if (user === undefined) {
                console.log("user undefined");
                var error = {
                    status: 401,
                    statusText: "user underfined"
                };
                return $q.reject(error);
            } else {
                var url = baseURL + "photo/" + id;
                console.log("url", url);
                return $http.put(url, data, {headers: {"user": user}})
                    .then(function (responce) {
                        return responce.data;
                    })
                    .catch(function (err) {
                        return err;
                    });
            }
        };

        //get new photo
        this.delPhoto = function (id, fileName) {
            var user = $cookies.get('user');
            if (user === undefined) {
                console.log("user undefined");
                var error = {
                    status: 401,
                    statusText: "user underfined"
                };
                return $q.reject(error);
            } else {
                var url = baseURL + "photo/" + id + "/photo/" + fileName;
                console.log("delete url: ", url);
                return $http.delete(url, {headers: {"user": user}})
                    .then(function (responce) {
                        return responce.data;
                    })
                    .catch(function (err) {
                        console.log("catch error in service");
                        return err;
                    });
            }
        };

        this.addPhoto = function (page, imageArray, files) {
            var user = $cookies.get('user');
            if (user === undefined) {
                console.log("user undefined");
                var error = {
                    status: 401,
                    statusText: "user underfined"
                };
                return $q.reject(error);
            } else {
                var url = baseURL + "photo/" + page + "/image";
                var promises = [];
                angular.forEach(files, function (file) {
                    var promise = file.upload = Upload.upload({
                        url: url,
                        method: 'POST',
                        headers: {"user": user},
                        data: {file: file}
                    });

                    file.upload.then(function (response) {

                    })
                        .catch(function (err) {
                            return $q.reject(err);
                        });
                    promises.push(promise);

                });
                return $q.all(promises);
            }
        };


    }]);
