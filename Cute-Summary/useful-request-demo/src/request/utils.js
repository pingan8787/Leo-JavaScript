import CryptoJS from 'crypto-js';
import md5 from 'md5';
import { SIGNATURE_AK, SIGNATURE_SK } from './config';

// 模拟处理 AES 加密
export const aesEncrypt = (text = "") => {
    const key = CryptoJS.enc.Utf8.parse(SIGNATURE_AK);
    const iv = CryptoJS.enc.Utf8.parse(SIGNATURE_SK);
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, { iv, mode: CryptoJS.mode.CBC }).toString();
}

// 模拟生成加签信息
export const getSignature = () => {
    const timestamp = (+new Date()).toString();
    const nonce = Math.random().toString().slice(2, 10) + (+new Date()).toString();
    const sign_version = "V2";
    const x_ca_key = SIGNATURE_AK;
    const x_sk = SIGNATURE_SK;

    const signature = timestamp + "\\n" + nonce + "\\n" + sign_version + "\\n" + x_ca_key + "\\n" + x_sk;
    return {
        timestamp,
        nonce,
        signature: md5(signature),
        sign_version,
        x_ca_key,
    }
}

// 模拟生成 token
export const getToken = () => {
    const timestamp = (+new Date()).toString();
    const nonce = Math.random().toString().slice(2, 10) + (+new Date()).toString();

    const tokenStr = timestamp + "\\n" + nonce + "\\n" + SIGNATURE_AK  + "\\n" + SIGNATURE_SK;

    return md5(tokenStr);
}