var app = require("../app");

app.directive('photoModelEdit', function () {
    return {
        templateUrl: 'js/directive/PhotoModelEdit.html',
        controller: 'PhotoModelCtrl'
    };
});