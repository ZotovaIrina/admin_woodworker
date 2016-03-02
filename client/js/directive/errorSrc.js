var app = require("../app");

app.directive('errorSrc',['baseResourceURL', function (baseResourceURL) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.bind("error", function (scope, element, attrs) {
                angular.element(this).attr("src", baseResourceURL + "/404error.jpg");
                angular.element(this).attr("style", "left: 0;");
                angular.element(this).attr("title", "Фото не найдено");

            });

        }
    };


}]);