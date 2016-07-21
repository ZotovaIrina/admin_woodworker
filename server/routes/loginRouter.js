var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    pathConfig = require('../config/path'),
    fs = require('fs');


var router = express.Router();

router.use(bodyParser.json());

var valid = require('../middleware/valid.js');



router.route('/')

.post(
    valid,
    function(req, res) {
        console.log("login router");
        //var file = path.join(pathConfig.dataDir + '/login.html');
        //console.log("send file: ", file);
        //res.sendFile(file);
        if(req.valid === true) {
            res.json({
                "success": true,
                "message": "log in"
            });
        } else {
            res.json({
                "success": false,
                "message": "log in incorrect"
            });
        }


    }
)
;




module.exports = router;