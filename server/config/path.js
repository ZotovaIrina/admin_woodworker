var path = require('path');
module.exports = {
    serverDir: path.join(__dirname, '../'),
    jsonDir: path.join(__dirname, '../../../woodworker/public/json/'),
    photoDir: path.join(__dirname, '../../../woodworker/public/image/photo/'),
    templateDir: path.join(__dirname, '../../../woodworker/public/template/'),
    clientDir: path.join(__dirname, '../../client'),
    resourceDir: path.join(__dirname, '../resource')
};