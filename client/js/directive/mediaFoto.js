var app = require("../app");

app.directive('mediaFotoDirective', function () {
    return {
        templateUrl: 'js/directive/mediaFoto.html',
        controller: 'fotoController'
    };
});