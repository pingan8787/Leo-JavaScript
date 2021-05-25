import * as net from 'net';
import * as EventEmitter from 'events';
import RequestMessage from "./RequestMessage";
import ResponseMessage from "./ResponseMessage";

type Handler = (request: RequestMessage, response: ResponseMessage) => void;

const defaultPort = 3000;

class HTTP extends EventEmitter{
    handler: Handler;
    request: RequestMessage;
    response: ResponseMessage;
    server: net.Server;
    socket: net.Socket;
    constructor(handler: Handler){
        super();
        this.handler = handler;
        this.createServer();
    }

    private createServer(): void {
        this.server = net.createServer(socket => {
            socket.on('data', (data: Buffer) => {
                const message = data.toString('utf-8');
                this.request = new RequestMessage(message);
                this.response = new ResponseMessage(socket);
                this.handler(this.request, this.response); // 返回 req res
            });

            socket.on('error', error => {
                this.emit('error', error);
            })
        })
    }

    public listen(port: number = defaultPort, callback: any = () => {}) : void{
        this.server.listen(port, callback);
        this.server.on('error', error => this.emit('error', error));
    }
}

const createServer = (handler: Handler) => {
    return new HTTP(handler);
}

export default {
    createServer
}