var app = require("../app");

app.controller('resourceCtrl', function ($resource) {
    this.section = ["room", "rocking_chair", "garden_furniture", "kitchen", "other", "baby"];
    var contentJson = $resource('resource/content.json').get().$promise;
    contentJson.then(
        function onSuccess(resource) {
            if (resource.success) {

                var contents = resource.data.content;
                console.log(contents);
            }
        },
        function onError() {
            console.error(arguments);
        }
    );

});

app.controller('sideMenu', function () {

    this.sections = ["room", "rocking_chair", "garden_furniture", "kitchen", "other", "baby"];

});