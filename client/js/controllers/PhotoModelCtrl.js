var app = require("../app");

app.controller('PhotoModelCtrl', ['$scope', function ($scope) {

    $('#photoModelEdit').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('image'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var recipientCaption = button.data('caption');
        var modal = $(this);
        modal.find('.modal-title').text('Редактирование фото ' + recipient);
        modal.find('.modal-body input').val(recipient);
        modal.find('#model-photo-img').attr("src", "resource/photo/big/room/" + recipient);
        modal.find('#model-photo-p').text(recipientCaption);
    });

}]);