// 手动调用，类似配置文件
require('esbuild').build({
    entryPoints: ['demo1.jsx'],
    bundle: true,
    outfile: 'demo3-1.js',
}).catch(() => process.exit(1))