var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'photoService', '$timeout', 'FileUploader', 'baseResourceURL', function ($scope, $stateParams, photoService, $timeout, FileUploader, baseResourceURL) {

    // Photo for which page controller should get
    var id = $stateParams.id;

    //string for ng-src="{{src}}{{image.name}}"
    $scope.src = baseResourceURL + "/photo/big/" + id + "/";

    $scope.alert = false;       // message success or error delete, edit, add
    $scope.alertMessage = "";   // text message
    $scope.activeImage = {}; // work scope. With this data we work in modal window and it repeat active image in pages
    $scope.alertCollor = "";


    photoService.getPhoto(id)
        .then(function (contents) {
            //array objects with image.name and image.caption
            $scope.images = contents;
        },
        function (err) {
            console.log("Error", err);
        });


    //open modal delete window
    $scope.modalDelete = function (image) {
        $scope.activeImage = image;
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalDel = true;
    };

    //close modal window
    $scope.modalClose = function () {
        $scope.modalDel = false;
        $scope.modalEd = false;
        $scope.modalA = false;
        $scope.activeImage = {};
        $("body").removeClass("lock");
        $(".substrate").removeClass("modal");
        uploader.clearQueue();
    };


    // delete photo
    $scope.deletePhoto = function () {
        var name = $scope.activeImage.name;
        var indexObj;
        angular.forEach($scope.images, function (image, key) {
            if (angular.equals(name, image.name)) {
                indexObj = key;
            }
        });
        if (indexObj !== undefined) {
            $scope.images.splice(indexObj, 1);

            $scope.modalDel = false;
            $("body").removeClass("lock");
            $(".substrate").removeClass("modal");
            photoService.setContents().update({id: id}, $scope.images).$promise
                .then(function (resourse) {
                    if (resourse.success) {
                        console.log("success");
                        $scope.alert = true;
                        $scope.alertMessage = "Фото удалено";
                        $scope.alertCollor = "alert-success";

                    } else {
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка";
                        console.log("error");
                        $scope.alertCollor = "alert-danger";
                    }
                });
        } else {
            console.log("Элемент не найден");
            $scope.activeImage = {};
        }
    };

    //open modal edit window and control window
    $scope.modalEdit = function (image) {
        $scope.activeImage = angular.copy(image);
        $scope.captionIsChanged = false;
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalEd = true;
    };

    $scope.$watch('activeImage.caption', function (newValue, oldValue) {
        console.log('newValue: ' + newValue + ', oldValue: ' + oldValue);
        if (oldValue) {
            console.log("change");
            $scope.captionIsChanged = true;
            return;
        }
        console.log("not change");


    });

    //edit photo's caption set
    $scope.EditPhoto = function () {
        var indexObj;
        var name = $scope.activeImage.name;
        angular.forEach($scope.images, function (image, key) {
            if (angular.equals(name, image.name)) {
                indexObj = key;
            }
        });
        if (indexObj !== undefined) {
            $scope.images[indexObj].caption = $scope.activeImage.caption;
            //send data on the server then get message from server success = true or not and show the message
            photoService.setContents().update({id: id}, $scope.images).$promise
                .then(function (resourse) {
                    if (resourse.success) {
                        console.log("success");
                        $scope.alert = true;
                        $scope.alertMessage = "Изменения сохранены";
                        $scope.alertColor = "alert-success";

                    } else {
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка";
                        console.log("error");
                        $scope.alertColor = "alert-danger";
                    }
                });
            $scope.modalEd = false;
            $("body").removeClass("lock");
            $(".substrate").removeClass("modal");
        } else {
            console.log("Элемент не найден");
        }
        $scope.activeImage = {};
    };


    //open modal add window
    $scope.modalAdd = function () {
        $scope.activeImage = {"1": 1};
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalA = true;
    };

    var uploader = $scope.uploader = new FileUploader({
        url: '/resource'
    });


}]);
