import HttpParser, { HttpMessage } from "./HttpParser";

export default class RequestMessage {
    private httpParser: HttpParser;
    public httpMessage: HttpMessage;

    constructor(message: string){
        this.httpParser = new HttpParser(message);
        this.httpMessage = this.httpParser.httpMessage;
    }
}