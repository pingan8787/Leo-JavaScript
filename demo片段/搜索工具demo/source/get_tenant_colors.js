var fs = require("fs");
var path = require('path');
var http = require('http');

function saveColor (data, callback) {
    var options = {
        // hostname: '127.0.0.1',
        hostname: 'http://moyufed.com',
        port: 7001,
        path: '/api/v1/colors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    };
    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            // console.log('BODY: ' + chunk);
            console.log( '上传'+data.tenantId+'租户的颜色成功');
            if(callback && typeof callback == 'function') {
                callback();
            }
        });
    });
    req.on('error', function (e) {
        console.log( '上传'+data.tenantId+'租户的颜色失败');
        if(callback && typeof callback == 'function') {
            callback();
        }
        // console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();
}

function setColor(tenantId, callback) {
    if(!tenantId) {
        return
    }
    var materialsPath = path.join(__dirname, '../materials/');
    var scssPath = path.join(materialsPath, '/' + tenantId + '/master/scss/base/_setting.scss');
    fs.exists(scssPath, function(exists){
        if(!exists){
            if(callback && typeof callback == 'function') {
                callback();
            }
            console.log(scssPath + ' not exists.');
        }else{
            var scssFile = fs.readFileSync(scssPath, {
                encoding: 'UTF-8'
            });
            var reg = /\$.*\:\s*\#\w+(\s*\#\w+)*\s*(!default)?\s*\;/g;
            var css = scssFile.match(reg);
            var obj = {};
            css.forEach(function (style) {
                var attr = style.match(/\$.*\:/g)[0].replace('$','').replace(':','');
                var color = style.match(/\#\w+(\s*\#\w+)*/g)[0];
                obj[attr] = color;
            });
            // console.log(obj);
            console.log( '提取'+tenantId+'颜色成功，开始上传');
            // console.log(css);
            var post_data = {
                tenantId: tenantId,
                colors: obj
            };
            saveColor(post_data, callback);
        }

    });
}

function getAllTenantColors(tenantId) {
    setColor(tenantId)
}

module.exports = getAllTenantColors;