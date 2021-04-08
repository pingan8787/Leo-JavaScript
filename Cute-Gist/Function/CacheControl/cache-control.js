const SPLIT_STR = '@';
const DATA_PROCESS_MAPPING = {
    'number': {
        save: data => data,
        parse: data => Number.parseFloat(data)
    },
    'object': {
        save: data => JSON.stringify(data),
        parse: data => JSON.parse(data)
    },
    'undefined': {
        save: data => data,
        parse: () => undefined
    },
    'default': {
        save: data => data,
        parse: data => data
    }
}

function getProcess(type) {
    return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING['default']
}

class LeoStorage {
    constructor(options = {}) {
        this.storage = options.storage || localStorage;
    }

    init() {

    }

    getItem(key) {
        const stringData = this.storage.getItem(key);
        if (stringData) {
            const dataArray = stringData.split(SPLIT_STR);
            const now = Date.now();
            let data;
            if (dataArray.length > 2 && dataArray[2] < now) { // 缓存过期
                this.storage.removeItem(key);
                return null;
            } else {
                const value = decodeURIComponent(dataArray[1]);
                data = getProcess(dataArray[0]).parse(value);
                return data;
            }
        }
        return null;
    }

    setItem(key, value, expired = 100) {
        // expired 过期时间 单位天 默认是100 上线测试没问题替换旧的设值
        const type = typeof value
        const process = getProcess(type)
        if (!expired) { // 默认不传 不过期  encodeURIComponent
            value = type + SPLIT_STR + encodeURIComponent(process.save(value));
        } else {
            const time = expired * 24 * 60 * 60 * 1000 + new Date().getTime();
            value = type + SPLIT_STR + process.save(value) + SPLIT_STR + time;
        }
        this.storage.setItem(key, value)
    }

    clear() {

    }

    removeItem() {

    }
}