var app = require("../app");

app.directive('photoModelEdit', function () {
    return {
        templateUrl: 'js/directive/PhotoModalEdit.html',
        controller: 'ModalDemoCtrl'
    };
});


app.controller('ModalDemoCtrl', function ($scope, $uibModal) {

    $scope.open = function (image) {
        $scope.img = image;
        //$uibModal is a service to quickly create AngularJS-powered modal windows
        //resolve - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'photoModelEdit.html',
            controller: ['$scope', '$uibModalInstance', 'img', function ($scope, $uibModalInstance, img) {
                $scope.img = img;
                $scope.ok = function () { // при нажатии на ок закрывается окно и выше передается выбранный айтам
                    console.log('ok');
                    console.log($scope.img.caption);
                    $uibModalInstance.close();
                };
                $scope.cancel = function () { //при нажатии на закрыть окно закрываетс и данные теряются.
                    $uibModalInstance.dismiss('cancel');
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

});
