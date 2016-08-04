var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'photoService', '$timeout',
    'baseResourceURL', 'baseURL', '$state', '$cookies', 'Upload',
    function ($scope, $stateParams, photoService, $timeout, baseResourceURL, baseURL, $state, $cookies, Upload) {

        // Photo for which page controller should get
        var id = $stateParams.id;
        var user = $cookies.get('user');

        //string for ng-src="{{src}}{{image.name}}"
        $scope.src = baseURL + "photo/" + id + "/photo/";

        $scope.alert = false;       // message success or error delete, edit, add
        $scope.alertMessage = "";   // text message
        $scope.activeImage = {}; // work scope. With this data we work in modal window and it repeat active image in pages
        $scope.alertColor = "";
        $scope.loadingSrc = baseResourceURL + "/712.gif";
        $scope.loadingShow = false;
        $scope.files = [];

        if (user === undefined) {
            $state.go('login');
        }

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
        function ApplyNewContent(data) {
            if (user === undefined) {
                $state.go('login');
            }
            photoService.setContents(id, data)
                .then(function (resource) {
                    if (resource.success) {
                        $scope.loadingShow = false;
                        $scope.images = data;
                        console.log(resource);
                        $scope.alert = true;
                        $scope.alertMessage = resource.textMessage;
                        $scope.alertColor = "alert-success";
                    }
                })
                .catch(function (error) {
                    console.log("catch error", error);
                    if (error.status == 401) {
                        console.log("catch error", error);
                        $state.go('login');
                    } else {
                        console.log("controller get error", error);
                        $scope.alert = true;
                        $scope.alertMessage = "Произошла ошибка: " + error.status + " " + error.statusText;
                        $scope.alertColor = "alert-danger";
                    }
                });
        }


        // delete photo
        $scope.deletePhoto = function () {
            var name = $scope.activeImage.name;
            var newArray = angular.copy($scope.images);
            var indexObj;
            angular.forEach(newArray, function (image, key) {
                if (angular.equals(name, image.name)) {
                    indexObj = key;
                }
            });
            if (indexObj !== undefined) {
                newArray.splice(indexObj, 1);
                ApplyNewContent(newArray);
                photoService.delPhoto(id, name)
                    .then(function () {
                        console.log("Delete success");
                    })
                    .catch(function (error) {
                        console.log("catch error", error);
                        if (error.status == 401) {
                            console.log("catch error", error);
                            $state.go('login');
                        } else {
                            console.log("controller get error", error);
                            $scope.alert = true;
                            $scope.alertMessage = "Произошла ошибка: " + error.status + " " + error.statusText;
                            $scope.alertColor = "alert-danger";
                        }
                    });
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
            var newArray = angular.copy($scope.images);
            var name = $scope.activeImage.name;
            angular.forEach(newArray, function (image, key) {
                if (angular.equals(name, image.name)) {
                    indexObj = key;
                }
            });
            if (indexObj === undefined) {
                console.log("Элемент не найден");
            } else {
                newArray[indexObj].caption = $scope.activeImage.caption;
                //send data on the server then get message from server success = true or not and show the message
                ApplyNewContent(newArray);

            }
            $scope.modalClose();
        };


        //open modal add window
        $scope.modalAdd = function () {
            $("body").addClass("lock");
            $(".substrate").addClass("modal");
            $scope.modalA = true;
        };

        $scope.AddPhoto = function () {
            if (user === undefined) {
                $state.go('login');
            }
            var newArray = angular.copy($scope.images);
            angular.forEach($scope.files, function (item, key) {
                var img = {};
                img.name = item.name;
                img.caption = item.caption;
                newArray.push(img);
            });
            $scope.loadingShow = true;
            photoService.addPhoto(id, newArray, $scope.files)
                .then(function (response) {
                    console.log("all photo has been upload", response);
                    ApplyNewContent(newArray);
                });


            $scope.modalClose();
        };


        $scope.removeNewPhoto = function (item) {
            var indexObj;
            angular.forEach($scope.files, function (image, key) {
                if (angular.equals(item.name, image.name)) {
                    indexObj = key;
                }
            });
            if (indexObj !== undefined) {
                $scope.files.splice(indexObj, 1);
            } else {
                console.log("Элемент не найден");
            }

        };


    }]);
