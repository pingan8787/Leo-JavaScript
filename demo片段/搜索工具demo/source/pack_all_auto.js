/**
 * Created by YuQian on 2018/10/18.
 */
// 一键打包工具

var parseXlsx = require('excel');
var SMSClient = require('@alicloud/sms-sdk');
var http = require('http');

var allTenant = ['autocnd','bhaf','demo','htsec','jdtz','sxyh', 'w1000',
    'nesc','ps', 'njcb', 'jinzhoubank', 'htsecotc','yswy','xindeco','hlzq','gxlq','familymart',
    'langjiu','liby', 'sinochem2', 'sbpc', 'cngrgs','puxin','voole','lyf','paycollege',
    'homeking', 'novavision', 'lgxy', 'huafeng796', 'ccnew', 'qlbchina','dmdj','tuoguan','kukahome','dfzq','ctripadmin','tkgj','sfjd','jyzb','hzhy',
    'yueguanjia','xmgdjt'];


// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
var accessKeyId = 'LTAIZ8wnLupXMVzd';
var secretAccessKey = 'OG1QLFHaqJlu6qEOP6n0DAuQCzQ64L';
var packAuto = {
    parseExcel: function (path) {
        return new Promise(function (resolve, reject) {
            var pack = [];
            parseXlsx.default('../tools/pack_all_auto.xlsx').then((data) => {
                for (var i = 1; i < data.length; i++) {
                    if(data[i][8] == '1' && allTenant.indexOf(data[i][0]) > -1) {
                        // console.log(data[i][0]);
                        pack.push(data[i][0])
                    }
                }
                if(pack.length) {
                    resolve(pack);
                } else {
                    reject(0);  
                }
            }).catch(function (error) {
                reject(error);
            });
        });


    },

    getTenant: function(type)  {
        return new Promise(function (resolve, reject) {
            http.get(`http://moyufed.com:7001/api/v1/autopacks?type=${type}`, (resp) => {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    try {
                        const result = JSON.parse(data);
                        if(result.success && result.data) {
                            resolve(result.data.tenants.map((i)=> i.tenantId === 'exe'?'common':i.tenantId));
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err.message);
            });
        });
    },
    
    sms: function (count) {
        //初始化sms_client
        var smsClient = new SMSClient({accessKeyId, secretAccessKey});
        //发送短信
        smsClient.sendSMS({
            PhoneNumbers: '13720880939', // 必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
            SignName: 'moyufed', // 必填:短信签名-可在短信控制台中找到
            TemplateCode: 'SMS_148520515', // 必填:短信模板
            TemplateParam: JSON.stringify({count: count}) // 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
        }).then(function (res) {
            var Code = res.Code; // 兼容打包环境旧版node
            if (Code === 'OK') {
                //处理返回参数
                console.log('已经发送短信。');
                // console.log(res)
            }
        }, function (err) {
            console.log(err)
        })
    }
};

module.exports = packAuto;