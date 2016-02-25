var app = require("../app");








//app.directive("fileread", [function () {
//    return {
//        scope: {
//            fileread: "="
//        },
//        link: function (scope, element, attributes) {
//            element.bind("change", function (changeEvent) {
//                var reader = new FileReader();
//                reader.onload = function (loadEvent) {
//                    scope.$apply(function () {
//                        scope.fileread = loadEvent.target.result;
//                    });
//                };
//                reader.readAsDataURL(changeEvent.target.files[0]);
//            });
//        }
//    };
//}]);








//return {
//    restrict: 'E',
//    scope: {
//        fileread: "="
//    },
//    replace: true,
//    template: '<div><input type="file" fileread="vm.uploadme" /> <p>fileread</p></div>',
//    link: function (scope, element, attributes) {
//        element.bind("change", function (changeEvent) {
//            var reader = new FileReader();
//            reader.onload = function (loadEvent) {
//                scope.$apply(function () {
//                    scope.fileread = loadEvent.target.result;
//                });
//            };
//            reader.readAsDataURL(changeEvent.target.files[0]);
//        });
//    }
//};