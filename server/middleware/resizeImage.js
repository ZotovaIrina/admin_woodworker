var express = require('express'),
    pathConfig = require('../config/path'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick');

module.exports = function resizeImage(req, res, next) {
    console.log('resize in page: ', req.params.page);
    var file = req.files.file,
        page = req.params.page,
        srcPath = path.join(file.path),
        dstPathMini = path.join(pathConfig.photoDir, 'mini/', page, '/', file.originalFilename),
        dstPathBig = path.join(pathConfig.photoDir, 'big/', page, '/', file.originalFilename);


    var argsMini = [
        srcPath,
        "-resize",
        "64",
        dstPathMini
    ];

    var argsBig = [
        srcPath,
        "-resize",
        "940",
        dstPathBig
    ];

    im.convert(argsMini, function(err) {
        if(err) { throw err; }
        console.log("Image mini resize complete");
    });
    im.convert(argsBig, function(err) {
        if(err) { throw err; }
        console.log("Image big resize complete");
    });
    next();
};

