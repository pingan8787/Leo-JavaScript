const createElement = (tag, attr) => {
    if(!tag) return;
    const elem = document.createElement(tag);
    // 还需要判断是个可迭代对象
    if(attr) Object.assign(elem, attr);
    return elem;
}

const createPreviewItem = async (container, file) => {
    if(!container || !file) return;
    const src = await readDataURL(file);
    const item = createElement("div", {className: "preview-item"});
    const title = createElement("div", {
        className: "preview-title", 
        innerText: "文件名：" + file.name
    });
    const size = createElement("div", {
        className: "preview-size", 
        innerText: "文件大小：" + file.size
    });
    const img = createElement("img", {src, className: "preview-image"});
    item.append(img);
    item.append(title);
    item.append(size);
    container.append(item);
}

const readDataURL = file => {
    return new Promise((resolve, reject) => {
        if(!file) resolve();
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}

const isImage = async file => {
    if(!file) return;
    const base64 = await readDataURL(file);
    return base64 && base64.slice(0, 10) === "data:image";
}

const uploadProgress = async (progressEvent) => {
    const divNumber = document.querySelector("#progressNumber");
    const divTime = document.querySelector("#progressTime");
    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
    divNumber.innerText = complete;
    divTime.innerText = Math.ceil(progressEvent.timeStamp);
}

const downloadProgress = async (progressEvent) => {

}