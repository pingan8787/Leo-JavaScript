/**
 * 用途：
 * 用于根据服务端返回的颜色值，生成所有租户的_setting-v2.scss文件
*/

var fs = require("fs");
var path = require('path');
var http = require('http');

var apiUrl = 'http://moyufed.com:7001/api/v1/colors';
var materialsPath = '../materials';
var saveFileName = '_setting-v2.scss';
var localScssPath= '../scss/base/_setting-v2.scss';

var mixinPath = '../scss/base/_mixins-v2.scss';
var mixinName = '_mixins-v2.scss';

var filterTenant = ["common"];  // 过滤不操作的租户

var localScss = '';         // 保存本地_setting-v2.scss内容
var localDir  = [];         // 保存本地文件夹列表
var codeFormat = 'utf-8';   // 编码格式

var count = 0;    // 新增文件的计数器

var regRule = {   // 匹配规则 这期只改标题栏 后续 列出所有 有存在对应值的时候才修改 左：要改的颜色 右：远程的颜色
	"$header-fs-color":"$white",
	"$header-bg-color":"$primary-color",
	"$header-border-color":"$white",
	"$header-other-fs-color":"$white",
	"$header-other-bg-color":"$primary-color",
	"$brand-color":"$footer-color"
};
/**
 * 通用方法 读取文件夹
 * @param {*} filePath 读取文件夹的路径
 * @param {*} callback 读取成功的回调
 */
function getCommonDir(dirPath, callback){
	return new Promise(function(resolve, reject){
		fs.readdir(dirPath, function(err, file){
	        if(err)reject(err);
	        callback && callback();
	        resolve(file);
	    });
	});
}


/**
 * 通用方法 读取文件
 * 例如_mixin-v2.scss这类
 * @param {*} filePath 读取文件的路径
 * @param {*} callback 读取成功的回调
 */
function getCommonFile(filePath, callback){
	return new Promise(function(resolve, reject){
		fs.readFile(path.join(__dirname, filePath), codeFormat, function(err, file){
	        if(err)reject(err);
	        resolve(file);
	        callback && callback();
	    });
	});
}

/**
 * 通用方法 保存文件
 * 例如_mixin-v2.scss这类
 * @param {*} savePath 保存文件的路径
 * @param {*} file     保存的文件内容
 * @param {*} callback 保存成功的回调
 */
function setCommonFile(savePath, file, callback){
	return new Promise(function(resolve, reject){
 		fs.writeFile(path.join(__dirname, savePath), file, function(err) {
	        if(err)reject(err);
	        resolve();
	        callback && callback();
	    })
	});
}


/**
 * 通用方法 复制文件
 * 例如_mixin-v2.scss这类
 * @param {*} filePath 读取文件的路径
 * @param {*} callback 复制成功的回调
 */
function copyCommonFile(filePath, targetPath, callback){
	return new Promise(function(resolve, reject){
		getCommonFile(filePath).then(function (file){
			setCommonFile(targetPath, file);
	        resolve();
	        callback && callback();
		}).catch(function(err){
			console.log(err);
		});
	})
}


/**
 * 获取本地数据  本地租户列表
 */
function getLocalData(){
	// 获取本地租户列表
    getCommonDir(materialsPath).then(function(res){
    	localDir = res;
    	console.log('本地共有租户文件夹：'+localDir.length+'个！');
    }).catch(function(err){
    	console.log(err);
    });
};


/**
 * 保存文件  _setting-v2.scss
 * @param {*} scssPath scss文件路径
 * @param {*} colors   远程租户数据
 */
function saveFile(scssPath, tenant){
 	setTenantColor(tenant).then(function(colors){
 		// setCommonFile(scssPath, colors, callback);
 		fs.writeFile(scssPath, colors, function(err) {
	        if(err){
	            console.log('Error! '+err);
	            return;
	        }
			count ++;
	        console.log('【' + saveFileName + '】文件添加成功(第' + count + '个，租户是' + tenant.tenantId +')！')
	    })
 	})
};

/**
 * 设置租户样式文件  _setting-v2.scss
 * @param {*} tenant 租户对象数据
 */
function setTenantColor(tenant){
	return new Promise (function(resolve, reject){
		var color = tenant.colors;
		var tenantId = tenant.tenantId;
		var callback = function(local){
			var newColors = local;
			for(var k in regRule){
				var name = regRule[k].replace('$','');  // 需要替换的颜色名称（去掉颜色名的$符号）
				var resColor = color[name];            // 远程规则的颜色（k 颜色名 regRule[k] 颜色值） 
				var r1 = "\\" + k + ".*([\\S\\s])!default;"; 
				var g1 = local.match(new RegExp(r1,"g"));   // 匹配规则 匹配本地setting-v2文件与需要替换的名称相同文本
				if(g1.length<0) return;
				var g2 = k + ":" + resColor + "!default;";
				newColors = newColors.replace(g1[0], g2);
				// console.log('当前租户：'+ tenantId + "原来的颜色：" + g1 + "，现在的颜色：" + resColor + "----" );
			}
			resolve(newColors);
		};
		// 获取本地_setting-v2.scss
		getCommonFile(localScssPath).then(function(local){
			callback(local);
		}).catch(function(err){
			reject(err);
		});
	});

};

/**
 * 设置租户文件内容  _setting-v2.scss
 * @param {*} tenant 租户对象数据
 */
function setTenantFile(tenant){
	var tenantId = tenant.tenantId;
	if(!tenantId) return;
    var tenantPath = path.join(__dirname, materialsPath);
    var scssPath = path.join(tenantPath, '/' + tenantId + '/master/scss/base');
    var settingV2Path = path.join(tenantPath, '/' + tenantId + '/master/scss/base/' + saveFileName);
    var isExistTenant = localDir.filter(function(dir){
		// console.log(dir+':'+tenantId);
    	return dir == tenantId;
    });
    if(isExistTenant.length === 0){
		// console.log('错误！本地不存在此租户 : '+tenantId);
    	return;
    }
    fs.stat(scssPath,function(err, stats){
    	if (err) {
    		// 当不存在 base 文件夹 则需要新建base文件夹 再添加_setting-v2.scss
    		// console.log('错误！当前路径不存在 : '+scssPath);
    		fs.mkdir(scssPath,function(e){
    			if(e){
    				// console.log('base文件夹创建失败：'+e);
    				return;
    			}
				// console.log('base文件夹创建成功：'+scssPath);
				saveFile(scssPath, tenant);
    		});

    	}else{
	    	fs.stat(settingV2Path, function(e,statsV2){
				saveFile(settingV2Path, tenant);// 不论有没有存在 都创建或覆盖
	    		// if(e){
	    		// 	// 不存在当前文件的时候 才要添加新的_setting-v2.scss进来
		    	// 	// console.log('不存在当前文件 : '+saveFileName);
				// 	saveFile(settingV2Path, tenant);
	    		// }else{
	    		// 	// 存在当前文件的时候 要覆盖掉旧_setting-v2.scss
		    	// 	console.log('已存在当前文件 : '+saveFileName);
				// 	// saveFile(settingV2Path, tenant);
	    		// }
	    	});
    	}

    });
};



/**
 * 获取远程样式
 */
function getColors(){
	getLocalData();
	var req = http.get(apiUrl, function(res){
		var result = '';
		res.setEncoding('utf8');
		res.on("data",function(chunk){
			result += chunk;
		});
		res.on("end",function(){
			try{
				var data = JSON.parse(result);
				if(data && data.code == 200 && data.data){
        			console.log('远程共有租户文件夹：'+data.data.length+'个！');
					data.data.forEach(function(tenant, index){
						// console.log('当前设置的租户是 : ' + tenant.tenantId);
						// 过滤不配置的租户
						if(filterTenant.indexOf(tenant.tenantId) >= 0) return;
						setTenantFile(tenant); // 对每个租户添加_setting-v2.scss
						importFile(tenant);    // 添加main.scss

						var mixinFilePath = materialsPath + '/' + tenant.tenantId + '/master/scss/base/' + mixinName;
						copyCommonFile(mixinPath,mixinFilePath);   // 添加_mixins-v2.scss
					}); 
				}
			}catch(err){
				console.log('Error! catch err:' + err);
			}
		})
	})

	req.on('error', function (e) { 
	    console.log('Error! field request:' + e); 
	}); 
};

/**
 * 添加租户main.scss文件引入_setting-v2.scss
 * @param {*} tenant 租户对象数据
 */
function importFile(tenant){
	getImportFile(tenant).then(function(data){
		if(!data){
			console.log('Error! import file error!');
			return;
		}
		saveImportFile(tenant, data);
	}).catch(function(err){
		console.log(err);
	});
}

/**
 * 获取本地文件main.scss并生成租户样式
 * @param {*} tenant 租户对象数据
 */
function getImportFile(tenant){
	var localMainPath= materialsPath + '/' + tenant.tenantId + '/master/scss/main.scss';
	return new Promise(function(resolve, reject){
		getCommonFile(localMainPath).then(function(scss){
			if(!scss) {
				reject('缺少文件：main.scss，租户: ' + tenant.tenantId)
			}else{

				var setting = scss.indexOf(saveFileName);
				var mixins = scss.indexOf(mixinName);
				var text = '';
				if(setting<0 && mixins<0){
					text = '\n"base/' + saveFileName + '",' + '\n"base/' + mixinName + '",';
				}else if(setting<0 && mixins>=0){
					text = '\n"base/' + saveFileName + '",';
				}else if(setting>=0 && mixins<0){
					text = '\n"base/' + mixinName + '",';
				}
				scss = scss.replace('"base/_setting",','"base/_setting",'+text);
				resolve(scss);
			}
		}).catch(function(err){
			if(err) reject('读取不到文件：main.scss，租户: ' + tenant.tenantId);
		});

	});
}

/**
 * 保存本地文件 main.scss
 * @param {*} tenant 租户对象数据
 * @param {*} data   替换后的文本
 */
function saveImportFile(tenant, data){
	var localMainPath= materialsPath + '/' + tenant.tenantId + '/master/scss/main.scss';
	setCommonFile(localMainPath, data).then(function(res){
        console.log('添加引入成功：'+ saveFileName +'，租户: ' + tenant.tenantId)
	}).catch(function(err){
		console.log(err)
	});
}


function init (){
	getColors();
}

init();



/**
 * 注意：
 * 这里是不包括定制租户的以下文件：
 * 图片： logo，学习页面icon雪碧图，我的页面icon， 发现页面icon
 * 
 * 
 * 天梭问题：导航栏div颜色，发现页和我的页面icon，进度条颜色
*/