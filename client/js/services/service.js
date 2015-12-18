var app = require("../app");


app.service('adminService', [function () {

       var information,
        contentPage;


    this.setInfo = function (contents) {    //get contents within resource controller
        information = contents;
    };

    contentPage = function (index) {  //get all photo and template for page with name index
        return information[index];
    };

    this.getPhotos = function (index) {     //get all photo for page with name index
        return contentPage(index).images;
    };
    this.getDescription = function (index) {    //get template for page with name index
        return contentPage(index).description;
    };


}]);