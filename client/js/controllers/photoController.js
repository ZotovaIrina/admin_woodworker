var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'adminService', '$timeout','FileUploader', function ($scope, $stateParams, adminService, $timeout, FileUploader) {

    var id = $stateParams.id;
    $scope.src = "resource/photo/big/" + id + "/";

    $scope.alert = false;       // message success or error delete, edit, add
    $scope.alertMessage = "";   // text message
    $scope.activeImage = {};        // work scope. With this data we work in modal window and it repeat active image in pages

    adminService.getPhoto(id)
        .then(function (contents) {
            $scope.images = contents;
        });


    $scope.modalDelete = function (image) {            //open modal delete window
        $scope.activeImage = image;
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalDel = true;
    };

    $scope.modalClose = function () {       //close modal window
        $scope.modalDel = false;
        $scope.modalEd = false;
        $scope.modalA = false;
        $("body").removeClass("lock");
        $(".substrate").removeClass("modal");
        uploader.clearQueue();
    };


    $scope.deletePhoto = function () {         // delete photo
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
            adminService.setContents().update({id: id}, $scope.images).$promise
                .then(function (resourse) {
                    if (resourse.success) {
                        console.log("success");
                        $scope.alert = true;
                        $scope.alertMessage = "Фото удалено";
                        $scope.alertCollor = "alert-warning";
                        $timeout(function () {
                            $scope.alert = false;
                            $scope.alertCollor = "";
                        }, 1500);
                    } else {
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка";
                        console.log("error");
                        $scope.alertCollor = "alert-danger";
                        $timeout(function () {
                            $scope.alert = false;
                            $scope.alertCollor = "";
                        }, 1700);
                    }
                });
        } else {
            console.log("Элемент не найден");
        }
    };

    $scope.modalEdit = function (image) {            //open modal edit window
        $scope.activeImage = angular.copy(image);
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalEd = true;
    };

    $scope.EditPhoto = function () {          //edit photo's caption
        var indexObj;
        var name = $scope.activeImage.name;
        angular.forEach($scope.images, function (image, key) {
            if (angular.equals(name, image.name)) {
                indexObj = key;
            }
        });
        if (indexObj !== undefined) {
            $scope.images[indexObj].caption = $scope.activeImage.caption;

            adminService.setContents().update({id: id}, $scope.images).$promise     //send data on the server then get message from server success = true or not and show the message
                .then(function (resourse) {
                    if (resourse.success) {
                        console.log("success");
                        $scope.alert = true;
                        $scope.alertMessage = "Изменения сохранены";
                        $scope.alertCollor = "alert-warning";
                        $timeout(function () {
                            $scope.alert = false;
                            $scope.alertCollor = "";
                        }, 1500);
                    } else {
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка";
                        console.log("error");
                        $scope.alertCollor = "alert-danger";
                        $timeout(function () {
                            $scope.alert = false;
                            $scope.alertCollor = "";
                        }, 1700);
                    }
                });
            $scope.modalEd = false;
            $("body").removeClass("lock");
            $(".substrate").removeClass("modal");
        } else {
            console.log("Элемент не найден");
        }
    };


    $scope.modalAdd = function () {            //open modal add window
        $scope.activeImage = {"1": 1};
        $("body").addClass("lock");
        $(".substrate").addClass("modal");
        $scope.modalA = true;
    };

    var uploader = $scope.uploader = new FileUploader({
        url: '/resource'
    });

    $scope.addPhoto = function () {         // add new photo


        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    };





}]);
