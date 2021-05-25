import * as net from 'net';
import HttpParser, { HttpMessage } from "./HttpParser";
import ResponseFormatter from './ResponseFormatter';

export default class ResponseMessage {
    private socket: net.Socket;
    private resFormatter: ResponseFormatter;

    constructor(socket: net.Socket){
        this.socket = socket;
        this.resFormatter = new ResponseFormatter();
    }

    public setHeader(key: string, value: string){
        this.resFormatter.setHeader(key, value);
    }

    public end(status: number, body: string) {
        const resFormatter = this.resFormatter;
        resFormatter.setStatus(status);
        resFormatter.setBody(body);
        // 向客户端发送 TCP 字节流数据
        this.socket.write(resFormatter.format());
        this.socket.pipe(this.socket);
        this.socket.end();
    }
}