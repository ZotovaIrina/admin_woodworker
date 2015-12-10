var app = require("../app");

app.directive('menuDirective', function () {
    return {
        templateUrl: 'js/directive/menu.html',
        controller: 'SideMenu'
    };
});