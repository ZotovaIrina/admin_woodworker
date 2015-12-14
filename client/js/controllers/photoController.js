var app = require("../app");

app.controller('PhotoController',['$scope', function ($scope) {
    $scope.images = $scope.contents.room.images;
    console.log($scope.images);

}]);

app.directive('orientable', function () {
    return {
        link: function(scope, element, attrs) {

            element.bind("load" , function(e){

                // success, "onload" catched
                // now we can do specific stuff:

                if(this.naturalHeight > this.naturalWidth){
                    this.className = "media-object media-photo-img-vertical";
                }
            });
        }
    };
});