var app = require("../app");

app.directive('photoModelEdit', function () {
    return {
        templateUrl: 'js/directive/PhotoModalEdit.html',
        controller: ['$scope', '$uibModal', function ($scope, $uibModal) {

            var updateImage = function (img) {

                var indexObj;
                angular.forEach($scope.images, function (image, key) {
                    if (angular.equals(img.name, image.name)) {
                        indexObj = key;
                    }
                });
                $scope.images[indexObj].caption = img.caption;
            };

            $scope.open = function (image, src) {
                $scope.img = angular.copy(image);

                //$uibModal is a service to quickly create AngularJS-powered modal windows
                //resolve - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'photoModelEdit.html',
                    controller: ['$scope', '$uibModalInstance', 'img', function ($scope, $uibModalInstance, img) {
                        $scope.img = img;
                        $scope.src = src;
                        $scope.ok = function () { // при нажатии на ок закрывается окно и выше передается выбранный айтам
                            updateImage(img);
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () { //при нажатии на закрыть окно закрываетс и данные теряются.
                            $uibModalInstance.close();
                        };
                    }],
                    resolve: {
                        img: function () {
                            return $scope.img;
                        }
                    }
                });

                modalInstance.result.then(function (caption) {
                    $scope.img.caption = caption;
                });
            };

        }]
    };
});

