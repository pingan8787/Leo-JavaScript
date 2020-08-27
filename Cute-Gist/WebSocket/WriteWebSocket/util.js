const crypto = require("crypto");

const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function generateAcceptValue(secWsKey) {
  return crypto
    .createHash("sha1")
    .update(secWsKey + MAGIC_KEY, "utf8")
    .digest("base64");
}

function parseMessage(buffer) {
  // 第一个字节，包含了FIN位，opcode, 掩码位
  const firstByte = buffer.readUInt8(0);
  // [FIN, RSV, RSV, RSV, OPCODE, OPCODE, OPCODE, OPCODE];
  // 右移7位取首位，1位，表示是否是最后一帧数据
  const isFinalFrame = Boolean((firstByte >>> 7) & 0x01);
  console.log("isFIN: ", isFinalFrame);
  // 取出操作码，低四位
  /**
   * %x0：表示一个延续帧。当 Opcode 为 0 时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片；
   * %x1：表示这是一个文本帧（text frame）；
   * %x2：表示这是一个二进制帧（binary frame）；
   * %x3-7：保留的操作代码，用于后续定义的非控制帧；
   * %x8：表示连接断开；
   * %x9：表示这是一个心跳请求（ping）；
   * %xA：表示这是一个心跳响应（pong）；
   * %xB-F：保留的操作代码，用于后续定义的控制帧。
   */
  const opcode = firstByte & 0x0f;
  if (opcode === 0x08) {
    // 连接关闭
    return;
  }
  if (opcode === 0x02) {
    // 二进制帧
    return;
  }
  if (opcode === 0x01) {
    // 目前只处理文本帧
    let offset = 1;
    const secondByte = buffer.readUInt8(offset);
    // MASK: 1位，表示是否使用了掩码，在发送给服务端的数据帧里必须使用掩码，而服务端返回时不需要掩码
    const useMask = Boolean((secondByte >>> 7) & 0x01);
    console.log("use MASK: ", useMask);
    const payloadLen = secondByte & 0x7f; // 低7位表示载荷字节长度
    offset += 1;
    // 四个字节的掩码
    let MASK = [];
    // 如果这个值在0-125之间，则后面的4个字节（32位）就应该被直接识别成掩码；
    if (payloadLen <= 0x7d) {
      // 载荷长度小于125
      MASK = buffer.slice(offset, 4 + offset);
      offset += 4;
      console.log("payload length: ", payloadLen);
    } else if (payloadLen === 0x7e) {
      // 如果这个值是126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小；
      console.log("payload length: ", buffer.readInt16BE(offset));
      // 长度是126， 则后面两个字节作为payload length，32位的掩码
      MASK = buffer.slice(offset + 2, offset + 2 + 4);
      offset += 6;
    } else {
      // 如果这个值是127，则后面的8个字节（64位）内容应该被识别成一个64位的二进制数表示数据内容大小
      MASK = buffer.slice(offset + 8, offset + 8 + 4);
      offset += 12;
    }
    // 开始读取后面的payload，与掩码计算，得到原来的字节内容
    const newBuffer = [];
    const dataBuffer = buffer.slice(offset);
    for (let i = 0, j = 0; i < dataBuffer.length; i++, j = i % 4) {
      const nextBuf = dataBuffer[i];
      newBuffer.push(nextBuf ^ MASK[j]);
    }
    return Buffer.from(newBuffer).toString();
  }
  return "";
}

function constructReply(data) {
  const json = JSON.stringify(data);
  const jsonByteLength = Buffer.byteLength(json);
  // 目前只支持小于65535字节的负载
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2;
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126;
  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength);
  // 设置数据帧首字节，设置opcode为1，表示文本帧
  buffer.writeUInt8(0b10000001, 0);
  buffer.writeUInt8(payloadLength, 1);
  // 如果payloadLength为126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小
  let payloadOffset = 2;
  if (lengthByteCount > 0) {
    buffer.writeUInt16BE(jsonByteLength, 2);
    payloadOffset += lengthByteCount;
  }
  // 把JSON数据写入到Buffer缓冲区中
  buffer.write(json, payloadOffset);
  return buffer;
}

module.exports = {
  generateAcceptValue,
  parseMessage,
  constructReply,
};