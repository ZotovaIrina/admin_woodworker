var app = require("../app");

app.directive('htmlTextarea', function () {
    return {
        restrict: 'E',
        scope:{
            html: '='
        },
        replace: true,
        template: '<textarea>{{html}}</textarea>',
        link: function(scope, element, attrs) {
            var initiated = false;
            function initEditor(){
                var editorElement = element[0];

                var editor = CKEDITOR.replace( editorElement, {
                    uiColor: '#5C534D',
                    width: '100%',
                    height: '40vh'
                });
                editor.on( 'change', function( evt ) {
                    scope.html = evt.editor.getData();
                    scope.apply();
                });
            }
            scope.$watch('html', function (value) {
                if(value && !initiated) {
                    initiated = true;
                    initEditor(value);
                }
            });
        }
    };
});