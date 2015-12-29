var app = require("../app");


app.service('adminService', ['$resource', '$q', function ($resource, $q) {

    var contentJson = function () {
        var promise = $resource('resource/content.json').get().$promise;

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

    this.getContents = function () {
        return info;
    };


    this.getSections = function () {
        return info.then(function (contents) {
            return Object.keys(contents);
        });

    };

    this.getPhoto = function(index){
        return info.then(function(contents){
            return contents[index].images;
        });
    };


    this.setContents = function(){

        return $resource('resource/content.json/data/content/:id', null, {'update': {method: 'PUT'}});
    };


}]);
