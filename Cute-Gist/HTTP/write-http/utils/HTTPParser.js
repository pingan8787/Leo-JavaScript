const HttpParser = message => {
    if(!message) return {};
    const messages = message.split("\r\n"); // 区分 header 和 body
    console.log(messages)
    const result = {
        head : messages[0],
        header : messages.slice(1, -2),
        body : messages.slice(-1)
    }
    
    return {
        ...parseHead(result.head),
        ...parseHeaders(result.header),
        ...parseBody(result.body),
    }
}

const parseHead = (head = '') => {
    const [method, url, version] = head.split(' ');
    return {method, url, version};
}

const parseHeaders = (headers = []) => {
    const result = {};
    for(let i = 0; i < headers.length; i ++){
        const [key, value] = headers[i].split(' ');
        result[key.toLocaleLowerCase()] = value.trim();
    }
    return result;
}

const parseBody = (body = ['']) => {
    return {body: body[0]}
}

module.exports = {
    HttpParser
}