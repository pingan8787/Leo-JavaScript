/**
 * https://mp.weixin.qq.com/s/fO3Mlui_CEoiNQ0xsGEv1Q —— 前端多线程大文件下载实践，提速10倍(拿捏百度云盘)
 */
function concatenate(arrays) {
    if (!arrays.length) return null;
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
    let result = new Uint8Array(totalLength);
    let length = 0;
    for (let array of arrays) {
        result.set(array, length);
        length += array.length;
    }
    return result;
}

function getContentLength(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("HEAD", url);
        xhr.send();
        xhr.onload = function () {
            resolve(
                // xhr.getResponseHeader("Accept-Ranges") === "bytes" &&
                ~~xhr.getResponseHeader("Content-Length")
            );
        };
        xhr.onerror = reject;
    });
}

function getBinaryContent(url, start, end, i) {
    return new Promise((resolve, reject) => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("range", `bytes=${start}-${end}`);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                resolve({
                    index: i,
                    buffer: xhr.response,
                });
            };
            xhr.send();
        } catch (err) {
            reject(new Error(err));
        }
    });
}

function saveAs({ name, buffers, mime = "application/octet-stream" }) {
    const blob = new Blob([buffers], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = name || Math.random();
    a.href = blobUrl;
    a.click();
    URL.revokeObjectURL(blob);
}

async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = [];
    const executing = [];
    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item, array));
        ret.push(p);

        if (poolLimit <= array.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

async function download({ url, chunkSize, poolLimit = 1 }) {
    const contentLength = await getContentLength(url);
    const chunks =
        typeof chunkSize === "number" ? Math.ceil(contentLength / chunkSize) : 1;
    const results = await asyncPool(
        poolLimit,
        [...new Array(chunks).keys()],
        (i) => {
            let start = i * chunkSize;
            let end = i + 1 == chunks ? contentLength - 1 : (i + 1) * chunkSize - 1;
            return getBinaryContent(url, start, end, i);
        }
    );
    const sortedBuffers = results
        .sort((a, b) => a.index - b.index)
        .map((item) => new Uint8Array(item.buffer));
    return concatenate(sortedBuffers);
}
