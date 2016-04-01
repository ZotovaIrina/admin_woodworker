var express = require('express'),
    app = express(),
    pathConfig = require('./config/path'),
    bodyParser = require('body-parser'),
    multiparty = require('multiparty'),
    gm = require('gm');


var templateRouter = require('./routes/templateRouter');

app.use(express.static(pathConfig.clientDir));
app.use('/resource', express.static(pathConfig.resourceDir));
app.use(bodyParser.json());

app.use('/template', templateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});












var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server has been started');
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



