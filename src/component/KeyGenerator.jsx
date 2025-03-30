import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import * as solanaWeb3 from '@solana/web3.js';
import { Clipboard } from 'lucide-react'; // Clipboard icon from lucide-react

export default function KeyGenerator() {
  const [walletType, setWalletType] = useState('ethereum');
  const [generatedKeyE, setGeneratedKeyE] = useState('');
  const [generatedKeyS, setGeneratedKeyS] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const generateKey = () => {
    try {
      const wallet = ethers.Wallet.createRandom();
      const keypair = solanaWeb3.Keypair.generate();

      const newKeyE = wallet.address;
      const newKeyS = keypair.publicKey.toBase58();

      // Store keys in state
      setGeneratedKeyE(newKeyE);
      setGeneratedKeyS(newKeyS);
      
      // Store in localStorage
      localStorage.setItem('walletType', walletType);
      localStorage.setItem('publicKeyE', newKeyE);
      localStorage.setItem('publicKeyS', newKeyS);

      setError('');
    } catch (e) {
      setError('Failed to generate key. Please try again.');
    }
  };

  const handleCopyKey = () => {
    const keyToCopy = walletType === 'ethereum' ? generatedKeyE : generatedKeyS;
    if (keyToCopy) {
      navigator.clipboard.writeText(keyToCopy)
        .then(() => alert('Key copied to clipboard!'))
        .catch(() => alert('Failed to copy key.'));
    }
  };

  const handleContinue = () => {
    if (!generatedKeyE && !generatedKeyS) {
      setError('Please generate a key before continuing.');
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full border border-[#DAA520] rounded-lg p-8 text-white text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#DAA520]">Key Generator</h1>

        <div className="mb-4">
          <label className="mr-2">Select Wallet Type:</label>
          <select
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
            className="text-white p-2 rounded-md"
          >
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <button
          onClick={generateKey}
          className="bg-black-200 text-white px-6 py-2 rounded-md font-semibold mb-4 hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Generate Key
        </button><br />

        {(generatedKeyE || generatedKeyS) && (
          <div className="mb-4 flex items-center justify-center space-x-2"> 
            <div className="flex items-center bg-black-800 p-2 rounded-md">
              <p className="font-bold break-words">{walletType === 'ethereum' ? generatedKeyE : generatedKeyS}</p>
              <Clipboard
                className="ml-2 text-[#DAA520] cursor-pointer hover:scale-110 transition-transform"
                size={20}
                onClick={handleCopyKey}
              />
            </div>
          </div>
        )}

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleContinue}
          disabled={!generatedKeyE && !generatedKeyS}
          className={`bg-black-200 text-white px-6 py-2 rounded-md font-semibold transition-colors ${!generatedKeyE && !generatedKeyS ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#DAA520] hover:text-black'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}