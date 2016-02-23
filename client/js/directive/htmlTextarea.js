var app = require("../app");

app.directive('htmlTextarea', function () {
    return {

        restrict: 'E',  //restricts the directive to a specific directive declaration style. E - Element name (default): <my-directive></my-directive>; A - Attribute (default): <div my-directive="exp"></div>C - Class: <div class="my-directive: exp;"></div> M - Comment: <!-- directive: my-directive exp -->
        scope: {
            html: '=' //find attribute with name html and pass it in the $scope.html for controller and scope.html for link
        },
        replace: true,  // replace directive in DOM on the dom element in template. For this template should contain one wrap element. Default: false and you will see your directive in Dom and child of directive will be template.
        template: '<textarea>{{html}}</textarea>',
        link: function (scope, element, attrs) {         //use for work with any interactivity, manipulate with DOM. Event, for example
            var initiated = false;

            function initEditor() {
                var editorElement = element[0]; //get 0 DOM element in template and pass it in editor

                var editor = CKEDITOR.replace(editorElement, {
                    uiColor: '#241B18',
                    width: '100%',
                    height: '60vh'
                });

                editor.on('change', function (evt) {
                    scope.html = evt.editor.getData();
                    scope.$apply();
                });
            }

            scope.$watch('html', function (value) {
                if (value && !initiated) {
                    initiated = true;
                    initEditor(value);
                }
            });
        }


    };
})
    .config(function () {
        CKEDITOR.config.format_p = {
            name: 'Normal',
            element: 'p',
            attributes: {
                'class': 'page-content-p'
            }
        };
        CKEDITOR.config.format_h1 = {
            name: 'Headline 1',
            element: 'h1',
            attributes: {
                'class': 'page-content-h1'
            }
        };
        //FixMe: Use config for endpoint variable
        CKEDITOR.config.contentsCss = [
            'http://vzlobin.ru/css/index.css',
            'http://vzlobin.ru/css/page.css',
            '/css/ckedit.css'
        ];
    });
