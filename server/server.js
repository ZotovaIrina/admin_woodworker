var express = require('express'),
    app = express(),
    pathConfig = require('./config/path'),
    bodyParser = require('body-parser'),
    path = require('path'),
    multiparty = require('connect-multiparty');


var templateRouter = require('./routes/templateRouter'),
    photoRouter = require('./routes/photoRouter');

app.use(express.static(pathConfig.clientDir));
app.use('/resource', express.static(pathConfig.resourceDir));
app.use(bodyParser.json());

app.use('/template', templateRouter);
app.use('/photo', photoRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server has been started');
});




