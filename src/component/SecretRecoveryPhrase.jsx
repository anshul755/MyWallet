import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";

export default function SecretRecoveryPhrase() {
  const navigate = useNavigate();
  const [mnemonic] = useState(generateMnemonic(128));
  const [isHidden, setIsHidden] = useState(false);
  const words = mnemonic.split(" ");

  const toggleHidden = () => {
    setIsHidden((prev) => !prev);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      alert("Secret Recovery Phrase copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the mnemonic:", error);
    }
  };

  // Define a secret key; in production, use a secure source (e.g., environment variable)
  const secretKey = "your-secure-key";
  // Derive a hashed key using SHA-256 to be used for AES encryption
  const hashedKey = CryptoJS.SHA256(secretKey).toString();

  // Encrypt the mnemonic using AES encryption
  const encryptMnemonic = (plainText) => {
    return CryptoJS.AES.encrypt(plainText, hashedKey).toString();
  };

  const handleNext = () => {
    // Encrypt the mnemonic before storing
    const encryptedMnemonic = encryptMnemonic(mnemonic);
    
    // Optionally store an array of encrypted mnemonics
    const storedMnemonics = JSON.parse(localStorage.getItem("mnemonics") || "[]");
    storedMnemonics.push(encryptedMnemonic);
    localStorage.setItem("mnemonics", JSON.stringify(storedMnemonics));
    
    // Store the encrypted mnemonic
    localStorage.setItem("mnemonic", encryptedMnemonic);
    
    navigate("/verify-recovery");
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border border-[#DAA520] rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-[#DAA520] text-center">
          Secret Recovery Phrase
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Write down this 12-word phrase and keep it safe.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {words.map((word, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-[#DAA520] rounded-md p-3 flex items-center"
            >
              <span className="font-bold w-6 text-right mr-2 text-[#DAA520]">
                {index + 1}.
              </span>
              <span className="text-gray-100">
                {isHidden ? "****" : word}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={toggleHidden}
              className="mr-4 text-sm text-[#DAA520] hover:text-white transition-colors underline"
            >
              {isHidden ? "Show seed phrase" : "Hide seed phrase"}
            </button>
            <button
              onClick={copyToClipboard}
              className="text-sm text-[#DAA520] hover:text-white transition-colors underline"
            >
              Copy to clipboard
            </button>
          </div>
          <p className="text-gray-400 text-sm italic">
            Make sure nobody is looking
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-[#333] text-white hover:bg-[#DAA520] transition-colors px-20 py-2 rounded font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
