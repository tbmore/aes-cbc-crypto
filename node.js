'use strict';
const crypto = require('crypto');

const fs = require('fs');
const { Buffer } = require('buffer');

// 文件加密 测试
function e(name1,name2) {
    fs.readFile(name1, (err, data) => {
        if (err) throw err;
        const dbase64 = encryption(data)
        // console.log(dbase64, 'encryption')
        // let dst = Buffer.from(dbase64, 'base64').toString().split(''),
        //     arr = new Uint8Array(dst.length)
        // for (var i = 0; i < dst.length; i++) {
        //     arr[i] = dst[i].charCodeAt(0)
        // }
        // console.log(arr, 'arr')
        fs.writeFile(name2, dbase64, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

// 文件解密 测试
function d(name1, name2) {
    fs.readFile(name1, (err, data) => {
        if (err) throw err;
        console.log(data)
        const dbase64 = decryption(data)
        console.log(dbase64, 'decryption')
        // let dst = Buffer.from(dbase64, 'base64').toString().split(''),
        //     arr = new Uint8Array(dst.length)
        // for (var i = 0; i < dst.length; i++) {
        //     arr[i] = dst[i].charCodeAt(0)
        // }
        // console.log(arr, 'arr')
        fs.writeFile(name2, dbase64, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

// e('1.txt','message.txt')
// d('message.txt','4.txt')

// e('1.rar','2.rar')
// d('2.rar','3.rar')

// e('node_modules.rar','node_modules1.rar')
// d('node_modules1.rar','node_modules2.rar')

// e('123.zip','1234.zip')

/**
 * AES加密的配置 
 * 1.密钥 
 * 2.偏移向量 
 * 3.算法模式CBC 
 * 4.补全值
 */
var AES_conf = {
    key: getSecretKey(), //密钥
    iv: '1111111111111111', //偏移向量
}

/**
 * 读取密钥key
 * 更具当前客户端的版本vid、平台platform获取对应的key
 */
function getSecretKey() {
    // return "abcdabcdabcdabcd";
    return 'kD4MKcvIYQayW312BhhKa1ugw6WpKWcD'
}

/**
 * AES_128_CBC 加密 
 * 128位 
 * return base64
 */
function encryption(data) {
    console.time('encryption-time')
    let key = AES_conf.key;
    let iv = AES_conf.iv;

    var cipherChunks = [];
    console.log(data, 'data')
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, 'utf8', null)); //(data, 'utf8', 'base64')) null : 默认buffer
    cipherChunks.push(cipher.final(null)); //cipher.final('base64')
    console.timeEnd('encryption-time')
    // return cipherChunks.join(''); // 内容拼接
    return Buffer.concat(cipherChunks); // 
}


/**
 * 解密
 * return utf8
 */
function decryption(data) {
    console.time('decryption-time')
    let key = AES_conf.key;
    let iv = AES_conf.iv;

    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, 'base64', null)); //data, 'base64', 'utf8')
    cipherChunks.push(decipher.final(null)); //'utf8'
    // return cipherChunks.join('');
    console.timeEnd('decryption-time')
    return Buffer.concat(cipherChunks);
}

// console.log(encryption('aaaaa4'), 999);
// console.log(decryption('H6MJBD+4Bb7X6cP4n/oS6w=='));