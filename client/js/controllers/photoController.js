var app = require("../app");

app.controller('PhotoController', ['$scope', '$stateParams', 'adminService', '$timeout', function ($scope, $stateParams, adminService, $timeout) {
    var id = $stateParams.id;
    $scope.alert = false;
    $scope.modalDel = false;
    $scope.activeImage = {};        // work scope. With this data we work in modal window and it repeat active image in pages

    $scope.src = "resource/photo/big/" + id + "/";

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
        $("body").removeClass("lock");
        $(".substrate").removeClass("modal");
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
        $scope.alert = true;
        $timeout(function () {
            $scope.alert = false;
        }, 1700);
        } else{
            console.log("Элемент не найден");
        }
    };

    $scope.modalEdit = function (image) {            //open modal delete window
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
            $scope.modalEd = false;
            $("body").removeClass("lock");
            $(".substrate").removeClass("modal");
        } else{
            console.log("Элемент не найден");
        }
    };

}]);
