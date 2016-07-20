var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    pathConfig = require('../config/path'),
    fs = require('fs');


var startRouter = express.Router();

startRouter.use(bodyParser.json());

var valid = require('../middleware/valid.js');



startRouter.route('/')

.get(
    valid,
    function(req, res) {
        //var file = path.join(pathConfig.dataDir + '/login.html');
        //console.log("send file: ", file);
        //res.sendFile(file);
        res.json({
            "success": true,
                "message": "log in"
        });
    }
)
;




module.exports = startRouter;