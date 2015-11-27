var express = require('express');
var app = express();
var pathConfig = require('./config/path');

app.use(express.static(pathConfig.clientDir));
app.use('/js',express.static(pathConfig.modulesDir));


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('SuperServer has been started');
});