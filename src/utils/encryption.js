import CryptoJS from "crypto-js";

export const encryptData = (data, password) => {
    return CryptoJS.AES.encrypt(data, password).toString();
};

export const decryptData = (ciphertext, password) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, password);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};
