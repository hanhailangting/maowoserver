const crypto = require('crypto');
const captcha = require('trek-captcha');

var setCrypto = (info) => {
    const secret = 'abcdefg';
    return crypto.createHmac('sha256', secret).update(info).digest('hex');
};

var createVerify = (req, res) => {
    return captcha().then(info => {
        req.session.verifyImg = info.token;
        return info.buffer;
    }).catch(() => {
        return false;
    });
};

module.exports = {
    setCrypto,
    createVerify
};