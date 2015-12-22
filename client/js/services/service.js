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


//
//this.getPhotos = function (index) {
//    //get all photo for page with name index
//    console.log('get photo');
//    return contentPage(index).images;
//};
//this.getDescription = function (index) {    //get template for page with name index
//    console.log('get template');
//    return contentPage(index).description;
//};

}])
;