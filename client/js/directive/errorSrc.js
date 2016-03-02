var app = require("../app");

app.directive('errorSrc',['baseResourceURL', function (baseResourceURL) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var image;
            element.on("error", function () {
                angular.element(this).attr("src", baseResourceURL + "/404error.jpg");
                angular.element(this).attr("style", "left: 0;");
                //modelObject is a scope property of the parent/current scope
                image.error = true;
                scope.$apply();
                console.log(image);
            });
            scope.$watch(attrs.errorSrc, function(value){
                image = value;
            });
        }
    };


}]);