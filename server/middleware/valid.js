var express = require('express'),
    path = require('path'),
    pathConfig = require('../config/path'),
    loginData = require('../config/login');


module.exports = function valid(req, res, next) {


    console.log("validation get data: ", req.body);
    if (req.body.userName === loginData.username) {
        console.log("username correct");
        if (req.body.userPassword === loginData.password) {
            console.log("password correct");
            req.valid = true;
            return next();
        }
        var err = new Error('You are not authenticated!');
        err.status = 401;
        err.statusText = "Username or password is not correct";
        return next(err);
    } else {
        console.log("username not correct");
        var err = new Error('You are not authenticated!');
        err.status = 401;
        err.statusText = "Username or password is not correct";
        return next(err);
    }




};