var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'photoService', '$timeout', 'FileUploader', 'baseResourceURL', function ($scope, $stateParams, photoService, $timeout, FileUploader, baseResourceURL) {

    // Photo for which page controller should get
    var id = $stateParams.id;

    //string for ng-src="{{src}}{{image.name}}"
    $scope.src = baseResourceURL + "/photo/big/" + id + "/";

    $scope.alert = false;       // message success or error delete, edit, add
    $scope.alertMessage = "";   // text message
    $scope.activeImage = {}; // work scope. With this data we work in modal window and it repeat active image in pages
    $scope.alertColor = "";


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
        $scope.modalA = false;
        $scope.modalDel = false;
        $scope.modalEd = false;
        $scope.activeImage = {};
        $("body").removeClass("lock");
        $(".substrate").removeClass("modal");
    };

//local function for set data in content.json
    function ApplyNewContent (textMessageSuccess) {
        photoService.setContents().update({id: id}, $scope.images).$promise
            .then(function (resourse) {
                if (resourse.success) {
                    console.log("success");
                    $scope.alert = true;
                    $scope.alertMessage = textMessageSuccess;
                    $scope.alertColor = "alert-success";

                } else {
                    $scope.alert = true;
                    $scope.alertMessage = "Произошла ошибка";
                    console.log("error");
                    $scope.alertColor = "alert-danger";
                }
            });
    }


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
            ApplyNewContent("Фото удалено");
        } else {
            console.log("Элемент не найден");
        }
        $scope.modalClose();
    };

    //open modal edit window and control window
    $scope.modalEdit = function (image) {
        $scope.activeImage = angular.copy(image);
        $scope.captionIsChanged = false;
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalEd = true;
    };

    //watch canging in $scope.activeimage in order to disabled OK button
    $scope.$watch('activeImage.caption', function (newValue, oldValue) {
        if (oldValue) {
            $scope.captionIsChanged = true;
        }
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
            ApplyNewContent("Изменения сохранены");
        } else {
            console.log("Элемент не найден");
        }
        $scope.modalClose();
    };


    //open modal add window
    $scope.modalAdd = function () {
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalA = true;
    };

    var uploader = $scope.uploader = new FileUploader({
        url: '/resource'
    });

    $scope.AddPhoto = function () {
        angular.forEach(uploader.queue, function (item, key) {
            var img = {};
            img.name = item.file.name;
            img.caption = item.caption;
            $scope.images.push(img);
        });
        uploader.uploadAll();
        //set data in content.json
        ApplyNewContent("Фото успешно добавлено");
        $scope.modalClose();

        uploader.clearQueue();
    };


}]);
