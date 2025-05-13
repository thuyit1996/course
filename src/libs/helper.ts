import CryptoJS from 'crypto-js';

const secretKey = "mySecret123";
export function encryptAES(plainText: string): string {
    const ciphertext = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return ciphertext;
}

export function decryptAES(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}