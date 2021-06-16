const readBuffer = (file, start = 0, end = 2) => {
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
    const base64 = await readBuffer(file);
    return base64 && base64.slice(0, 10) === "data:image";
}

const uploadProgress= async (progressEvent) => {
    const divNumber = document.querySelector("#progress-number");
    const divTime = document.querySelector("#progress-time");
    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
    divNumber.innerText = complete;
    divTime.innerText = Math.ceil(progressEvent.timeStamp);
}