import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";

export default function VerifyRecoveryPhrase2() {
  const navigate = useNavigate();

  // Define the secret key used during encryption.
  const secretKey = "your-secure-key";
  // Derive a hashed key using SHA-256 (must match the encryption process)
  const hashedKey = CryptoJS.SHA256(secretKey).toString();

  // Retrieve the AES-encrypted mnemonic from localStorage.
  const encryptedMnemonic = localStorage.getItem("mnemonic");

  if (!encryptedMnemonic) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: No valid mnemonic found. Please go back and try again.
      </div>
    );
  }

  // Decrypt the mnemonic using AES.
  let decryptedMnemonic = "";
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, hashedKey);
    decryptedMnemonic = bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
  }

  if (!decryptedMnemonic) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: Unable to decrypt mnemonic. Please check your secret key.
      </div>
    );
  }

  // Split the decrypted mnemonic into words and ensure it contains exactly 12 words.
  const words = decryptedMnemonic.split(" ");
  if (words.length !== 12) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: Stored mnemonic is invalid. Expected 12 words.
      </div>
    );
  }

  const [hiddenIndices, setHiddenIndices] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Randomly hide 3 words (or as many as possible if fewer than 3)
    const numToHide = Math.min(3, words.length);
    const indices = [];
    while (indices.length < numToHide) {
      const randomIndex = Math.floor(Math.random() * words.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    // Sort indices for consistency
    indices.sort((a, b) => a - b);
    setHiddenIndices(indices);
    setUserInputs(Array(numToHide).fill(""));
  }, [decryptedMnemonic, words.length]);

  const handleInputChange = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const verifyWords = () => {
    // Compare each user input with the corresponding word in the decrypted mnemonic.
    let valid = true;
    for (let i = 0; i < hiddenIndices.length; i++) {
      const idx = hiddenIndices[i];
      if (userInputs[i].trim() !== words[idx]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      setError("");
      // If verification passes, navigate to the next step.
      navigate("/walletdashboard"); // Replace with your actual next route.
    } else {
      setError("Verification failed. Please check the words and try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border border-[#DAA520] rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-[#DAA520] text-center">
          Verify Recovery Phrase
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Enter the missing words from your Secret Recovery Phrase.
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
              {hiddenIndices.includes(index) ? (
                <input
                  type="text"
                  value={userInputs[hiddenIndices.indexOf(index)]}
                  onChange={(e) =>
                    handleInputChange(hiddenIndices.indexOf(index), e.target.value)
                  }
                  className="bg-gray-700 text-white p-1 w-20 rounded text-center"
                  placeholder="???"
                />
              ) : (
                <span className="text-gray-100">{word}</span>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <div className="text-center">
          <button
            onClick={verifyWords}
            className="bg-black-200 hover:text-black text-white hover:bg-yellow-500 transition-colors px-20 py-2 rounded font-semibold"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
