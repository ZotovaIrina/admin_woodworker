var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    jsonfile = require('jsonfile'),
    pathConfig = require('../config/path'),
    multiparty = require('connect-multiparty');

var photoRouter = express.Router();

photoRouter.use(bodyParser.json());


photoRouter.route('/')

    .get(function (req, res) {
        console.log("get data");
        var file = pathConfig.serverDir + '/data/content.json';
        jsonfile.readFile(file, function (err, content) {
            res.json(content);
        })
    });


photoRouter.route('/:page')

    .put(function (req, res) {
        var file = pathConfig.serverDir + '/data/content.json',
            page = req.params.page;
        jsonfile.readFile(file, function (err, content) {
            console.log('page', page);
            content.data.content[page].images = req.body;
            console.log('new data: ', content.data.content[page].images);
            jsonfile.writeFile(file, content, function () {
                res.json({
                    success: true,
                    textMessage: 'Данные успешно сохранены'
                });
            })
        });

    });

module.exports = photoRouter;