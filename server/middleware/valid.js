var express = require('express'),
    path = require('path'),
    pathConfig = require('../config/path');


module.exports = function valid(req, res, next) {

    console.log("validation");

    next();

};