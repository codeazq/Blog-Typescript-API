new Buffer(data, 'base64');
let text = buff.toString('ascii');

const decodedPayload = JSON.parse(Buffer.from(payload, 'base64'))