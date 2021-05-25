import { Headers } from './HttpParser';

export default class ResponseFormatter {
    private status: number = 200;
    private message: string = 'ok';
    private version: string = 'HTTP/1.1';
    private headers: Headers = null;
    private body: string = '';

    constructor(){
        this.headers = {
            'Content-Type': 'text/plain'
        }
    }

    public setStatus(status: number){
        this.status = status;
    }

    public setBody(body: string){
        this.body = body;
    }

    public setHeader(key: string, val: string) {
        this.headers[key] = val;
    }

    public format(): string {
        const head = `${this.version} ${this.status} ${this.message}`;
        let headers = '';
        for(let k in this.headers){
            headers += `${k.toLocaleLowerCase()}: ${this.headers[k]}\r\n`;
        }
        return [head, headers, this.body].join('\r\n');
    }
}