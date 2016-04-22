var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    jsonfile = require('jsonfile'),
    pathConfig = require('../config/path'),
    multiparty = require('connect-multiparty'),
    fs = require('fs');


var resizeImage = require('../middleware/resizeImage.js');


var photoRouter = express.Router();

photoRouter.use(bodyParser.json());


photoRouter.route('/')

    .get(function (req, res) {
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


photoRouter.route('/:page/photo/:photoName')

    .get(function (req, res, next) {
        console.log("get");
        console.log(req.params);
        var page = req.params.page,
            photoName = req.params.photoName,
            fileAddress = '/data/photo/big/' + page + '/' + photoName;
        res.sendFile(path.join(pathConfig.serverDir + fileAddress));
    });

photoRouter.route('/:page/image')

    .post(
    multiparty({
        uploadDir: path.join(pathConfig.photoDir, 'temp/')
    }),
    resizeImage,
    function (req, res) {
        console.log("post request");
        var file = req.files.file;
        res.json({
            success: true,
            textMessage: 'Новое фото успешно сохранено'
        });
    });

module.exports = photoRouter;