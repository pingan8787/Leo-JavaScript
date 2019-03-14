var fs = require("fs");
var path = require('path');
var unzipper = require('unzipper');
var PATH = path.join(__dirname, '../develop/lib/exe_icon_fonts/');
var mv = require('mv');


function unZipFont() {
    console.log("开始解压字体…");
    fs.createReadStream(PATH+'download.zip').pipe(unzipper.Extract({ path: PATH }))
        .on('entry', function (entry) {
        }).on("close",function (data) {
        console.log("解压字体成功,查找字体…");
        var newPath = "", oldPath = "";
        fs.readdirSync(PATH).forEach(file => {
            if(fs.statSync(PATH + file).isDirectory()) {
                newPath = PATH+file;
                oldPath = PATH;
            }
        })


        console.log("查找完成，开始拷贝…");
        var fontFiles = fs.readdirSync(newPath);
        
        var counter = 0;
        var fontFilesCount = fontFiles.length;
        
        function moveFile() {
            mv(newPath+'\\'+fontFiles[counter], oldPath+'\\'+fontFiles[counter], function(err) {
                if(err) {
                    console.log(err);
                    return
                }
                console.log(counter+1+": 移动"+fontFiles[counter]+"成功");
                counter ++ ;
                if(counter < fontFilesCount) {
                    moveFile();
                }
                if (counter == fontFilesCount) {
                    console.log("完成拷贝，清除空目录…");
                    fs.rmdirSync(newPath);
                    console.log("清除成功，开始创建样式…");


                    var FONT_CLASS = [];
                    
                    var cssStr = fs.readFileSync(PATH+'iconfont.css', {
                        encoding: 'UTF-8'
                    });
                    
                    var reg = /exe-\w+(-|(?=:))/g;
                    var css = cssStr.match(reg);
                    
                    for (var i in css) {
                        // console.log(css[i]);
                        if(FONT_CLASS.indexOf(css[i]) < 0) {
                            FONT_CLASS.push(css[i])
                        }

                    }

                    FONT_CLASS = FONT_CLASS.map(function (item) {
                        return '[class^="'+item+'"], [class*=" '+item+'"]';
                    })

                    // [class^="exe-"], [class*=" exe-"] {
                    //     /* use !important to prevent issues with browser extensions that change fonts */
                    //     font-family:"iconfont" !important;
                    //     speak: none;
                    //     font-style: normal;
                    //     font-weight: normal;
                    //     font-variant: normal;
                    //     text-transform: none;
                    //     line-height: 1;
                    //
                    //     /* Better Font Rendering =========== */
                    //     -webkit-font-smoothing: antialiased;
                    //     -moz-osx-font-smoothing: grayscale;
                    // }
                    var replaceClassStr = FONT_CLASS.join(",\n");
                    replaceClassStr += '\n{\n' +
                        '\tfont-family:"iconfont" !important;\n' +
                        '\tspeak: none;\n' +
                        '\tfont-style: normal;\n' +
                        '\tfont-weight: normal;\n' +
                        '\tfont-variant: normal;\n' +
                        '\ttext-transform: none;\n' +
                        '\tline-height: 1;\n' +
                        '\t-webkit-font-smoothing: antialiased;\n' +
                        '\t-moz-osx-font-smoothing: grayscale;\n' +
                        '}';
                    fs.writeFileSync(PATH+'iconfont.css', cssStr+replaceClassStr, {
                        encoding: 'UTF-8'
                    })
                    fs.unlinkSync(PATH+'download.zip');
                    console.log("创建成功")
                }
            })
        }

        moveFile();
    })
}

module.exports = unZipFont;
