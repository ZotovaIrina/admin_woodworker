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
    function (req, res) {
        console.log("login router");
        res.json({
            "success": true,
            "message": "log in"
        });

    }
)
;


module.exports = router;