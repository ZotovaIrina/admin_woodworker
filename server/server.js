var express = require('express');
var app = express();
var pathConfig = require('./config/path');
var bodyParser = require('body-parser'),
    multiparty = require('multiparty'),
    gm = require('gm');

app.use(express.static(pathConfig.clientDir));
app.use('/js', express.static(pathConfig.modulesDir));
app.use('/resource', express.static(pathConfig.resourceDir));
app.use(bodyParser.json());

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('SuperServer has been started');
});

app.put('/resource/content.json/data/content/:id', function (req, res) {
    res.json({
        success: true
    });
    console.log(req.body);
});
app.put('/resource/photo', function (req, res) {

    res.json({
        success: true
    });
    console.log(req.body);
});

app.put('/resource/template/room.html', function (req, res) {

    res.json({
        success: true
    });
    console.log(req.body);
});

app.get('/syncftp', function (req, res) {

    
});
//app.post('/resource/photo/src', function (req, res) {
//    res.json({
//        success: true
//    });
//});
