var express = require('express'),
    path = require('path'),
    pathConfig = require('../config/path'),
    loginData = require('../config/login');


module.exports = function valid(req, res, next) {

var user = req.body.user || req.headers.user;
    console.log("req.headers", req.headers);
    if(user !==undefined) {
        if (typeof user == 'string') {
            user = JSON.parse(user);
        }

        console.log("validation get data: ", user);
        if (user.userName === loginData.username) {
            console.log("username correct");
            if (user.userPassword === loginData.password) {
                console.log("password correct");
                return next();
            }
            var err = new Error('You are not authenticated!');
            err.status = 401;
            err.statusText = "Username or password is not correct";
            return next(err);
        }
    }
     else {
        console.log("username not correct");
        var err = new Error('You are not authenticated!');
        err.status = 401;
        err.statusText = "Username or password is not correct";
        return next(err);
    }




};