var app = require("../app");

app.controller('fotoController', function ($resource) {
    var contentJson = $resource('resource/content.json').get().$promise;
    var controller = this;
    contentJson.then(
        function onSuccess(resource) {
            if (resource.success) {

                var contents = resource.data.content;
                console.log(contents);
                controller.contents = contents;
                controller.sections = Object.keys(contents);
            }
        },
        function onError() {
            console.error(arguments);
        }
    );

});