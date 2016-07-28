var path = require('path');

// object for VDS server


//module.exports = {
//    serverDir: path.join(__dirname, '../'),
//    jsonDir: path.join(__dirname, '../../../woodworker/public/json/'),
//    photoDir: path.join(__dirname, '../../../woodworker/public/image/photo/'),
//    tempDir: path.join(__dirname, '../../../woodworker/public/image/photo/temp'),
//    templateDir: path.join(__dirname, '../../../woodworker/public/template/'),
//    clientDir: path.join(__dirname, '../../client'),
//    resourceDir: path.join(__dirname, '../resource'),
//    dataDir: path.join(__dirname, '../data')
//};


//Development object

module.exports = {
    serverDir: path.join(__dirname, '../'),
    jsonDir: path.join(__dirname, '../../../woodworker/json/'),
    photoDir: path.join(__dirname, '../../../woodworker/image/photo/'),
    tempDir: path.join(__dirname, '../../../woodworker/image/photo/'),
    templateDir: path.join(__dirname, '../data/photo/temp/'),
    clientDir: path.join(__dirname, '../../client'),
    resourceDir: path.join(__dirname, '../resource'),
    dataDir: path.join(__dirname, '../data')
};