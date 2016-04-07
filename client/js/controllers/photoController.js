var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'photoService', '$timeout', 'FileUploader', 'baseResourceURL', 'baseURL', '$http',
    function ($scope, $stateParams, photoService, $timeout, FileUploader, baseResourceURL, baseURL, $http) {

    // Photo for which page controller should get
    var id = $stateParams.id;

    //string for ng-src="{{src}}{{image.name}}"
    $scope.src = baseResourceURL + "/photo/big/" + id + "/";

    $scope.alert = false;       // message success or error delete, edit, add
    $scope.alertMessage = "";   // text message
    $scope.activeImage = {}; // work scope. With this data we work in modal window and it repeat active image in pages
    $scope.alertColor = "";
    $scope.loadingSrc = baseResourceURL + "/712.gif";
    $scope.loadingShow = false;

    $scope.getTestData = function(){
        var url = baseURL + "photo/";
        $http.get(url)
            .then(function (responce) {
                console.log("get data new data: ");
                console.log(responce);
            });
    };

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
    function ApplyNewContent(data, textMessageSuccess) {
        photoService.setContents().update({id: id}, data).$promise
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
            ApplyNewContent($scope.images, "Фото удалено");
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
        if (indexObj === undefined) {
            console.log("Элемент не найден");
        } else {
            $scope.images[indexObj].caption = $scope.activeImage.caption;
            //send data on the server then get message from server success = true or not and show the message
            //ApplyNewContent($scope.images, "Изменения сохранены");
            var setData = {"data": "This is json data"};
            photoService.setContents(id, $scope.images)
                .then(function (resource) {
                    if (resource.success) {
                        console.log(resource);
                        $scope.alert = true;
                        $scope.alertMessage = resource.textMessage;
                        $scope.alertColor = "alert-success";
                    } else {
                        $scope.alert = true;
                        $scope.alertMessage = resource.status + " " + resource.statusText;
                        $scope.alertColor = "alert-danger";
                    }
                });
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
        url: baseURL + '/photo/room'
    });


    $scope.AddPhoto = function () {
        var newArray = angular.copy($scope.images);
        angular.forEach(uploader.queue, function (item, key) {
            var img = {};
            img.name = item.file.name;
            img.caption = item.caption;
            newArray.push(img);
        });
        $scope.loadingShow = true;

        photoService.setContents().update({id: id}, newArray).$promise
            .then(function (resourse) {

                if (resourse.success) {
                    console.log("success");
                    $scope.alert = true;
                    $scope.alertMessage = "Фото успешно добавлено";
                    $scope.alertColor = "alert-success";

                }
            })
            .then(function () {
                $scope.loadingShow = false;
                console.log("get new data");
                //FixMe: download data from server
                $scope.images = angular.copy(newArray);
            })
            .catch(function () {
                $scope.alert = true;
                $scope.alertMessage = "Произошла ошибка сохранения данных";
                console.log("error");
                $scope.alertColor = "alert-danger";
            });
        //set data in content.json
        //       ApplyNewContent(newArray, "Фото успешно добавлено", UpdateNewImage ());

        $scope.modalClose();

        uploader.clearQueue();
    };


}]);
