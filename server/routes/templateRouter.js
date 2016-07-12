var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    pathConfig = require('../config/path'),
    fs = require('fs');

var templateRouter = express.Router();

templateRouter.use(bodyParser.json());

templateRouter.route('/:template')

    .get(function (req, res, next) {
        var template = req.params.template,
            fileAddress = template + '.html';
        res.sendFile(path.join(pathConfig.templateDir + fileAddress));
    })

    .put(function (req, res, next) {
        var template = req.params.template,
            fileAddress = pathConfig.templateDir + template + '.html';
        fs.writeFile(fileAddress, req.body.data, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json({
                    "success": true
                });
                console.log("The file was saved!");
            }

        });
    });

module.exports = templateRouter;