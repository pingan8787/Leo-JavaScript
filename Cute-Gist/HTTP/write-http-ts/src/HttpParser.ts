export type Headers = { [key: string]: string};

export type HttpMessage = {
    method: string;
    url: string;
    version: string;
    headers: Headers;
    body: string;
}

export default class HttpParser {
    private message: string;
    public httpMessage: HttpMessage = null;

    constructor(message: string){
        this.message = message;
        this.parse();
    }

    private parse(): void {
        this.httpMessage = {} as HttpMessage;
        const messages = this.message.split("\r\n"); // 区分 header 和 body
        const [head] = messages;
        const header= messages.slice(1, -2);
        const [body] = messages.slice(-1);
        this.parseHead(head);
        this.parseHeader(header);
        this.parseBody(body);
    }

    private parseHead(headStr: string) {
        const [method, url, version] = headStr.split(' ');
        this.httpMessage.method = method;
        this.httpMessage.url = url;
        this.httpMessage.version = version;
    }

    private parseHeader(headerStr: string[]) {
        this.httpMessage.headers = {};
        for(let i = 0; i < headerStr.length; i ++){
            let [key, value] = headerStr[i].split(' ');
            this.httpMessage.headers[key.toLocaleLowerCase()] = value.trim();
        }
    }

    private parseBody(bodyStr: string) {
        if(!bodyStr) return this.httpMessage.body = '';
        this.httpMessage.body = bodyStr;
    }
}