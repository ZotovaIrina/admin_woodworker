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
        var file = pathConfig.jsonDir + 'content.json';
        console.log("send file from adress: ", file);
        jsonfile.readFile(file, function (err, content) {
            res.json(content);
        })
    });


photoRouter.route('/:page')

    .put(function (req, res) {
        var file = pathConfig.jsonDir + 'content.json',
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
        var page = req.params.page,
            photoName = req.params.photoName,
            fileAddress = 'big/' + page + '/' + photoName;
        res.sendFile(path.join(pathConfig.photoDir + fileAddress));
    })

    .delete(function (req, res, next) {
        console.log("delete");
        console.log(req.params);
        var page = req.params.page,
            photoName = req.params.photoName,
            fileAddressBig = 'big/' + page + '/' + photoName,
            fileAddressMini = '/mini/' + page + '/' + photoName;
        console.log("big file delete: ", path.join(pathConfig.photoDir + fileAddressBig));
        fs.unlink(path.join(pathConfig.photoDir + fileAddressBig), function(response) {
            console.log("delete file success");
        });
        fs.unlink(path.join(pathConfig.photoDir + fileAddressMini), function(response) {
            console.log("delete file success", response);
        });
        res.json({
            success: true
        });
    });

photoRouter.route('/:page/image')

    .post(
    multiparty({
        uploadDir: path.join(pathConfig.serverDir, 'data/photo/temp/')
    }),
    resizeImage,
    function (req, res) {
        var file = req.files.file;
        console.log("router");
        res.json({
            success: true,
            photoAdress: req.doc.dstPathBig,
            textMessage: 'Новое фото успешно сохранено'
        });
    });

module.exports = photoRouter;