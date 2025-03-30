import CryptoJS from 'crypto-js';

export const generateKeys = (password) => {
  // Generate random salt
  const salt = CryptoJS.lib.WordArray.random(128/8);
  
  // Use proper key derivation
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 1000
  });

  // Return as hex strings
  return {
    privateKey: key.toString(CryptoJS.enc.Hex),
    publicKey: key.toString(CryptoJS.enc.Hex),
    salt: salt.toString()
  };
};