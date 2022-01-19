export default function (params) {
    return {
        name: 'test-hooks',

        // 构建阶段
        options(options){
            console.log('[options]')
        },
        buildStart (options) {
            console.log('[buildStart]')
        },
        resolveId (source, importer, options) {
            console.log('[resolveId]')
        },
        load (id) {
            console.log('[load]')
        },
        transform (code, id) {
            console.log('[transform]')
        },
        moduleParsed (moduleInfo) {
            console.log('[moduleParsed]')
        },
        buildEnd (error) {
            console.log('[buildEnd]')
            console.log('[-------------]')
        },
        watchChange(id, change) {
            console.log('[watchChange]')
        },
        closeWatcher() {
            console.log('[closeWatcher]')
        },

        // 生成阶段
        outputOptions() {
            console.log('[outputOptions]')
        },
        renderStart() {
            console.log('[renderStart]')
        },
        banner() {
            console.log('[banner]')
        },
        footer() {
            console.log('[footer]')
        },
        intro() {
            console.log('[intro]')
        },
        outro() {
            console.log('[outro]')
        },
        augmentChunkHash() {
            console.log('[augmentChunkHash]')
        },
        renderChunk() {
            console.log('[renderChunk]')
        },
        generateBundle(chunkInfo) {
            console.log('[generateBundle]')
        },
        writeBundle() {
            console.log('[writeBundle]')
        },
        closeBundle() {
            console.log('[closeBundle]')
        },
    }
}