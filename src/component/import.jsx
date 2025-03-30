import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WalletImport() {
  const [publicKey, setPublicKey] = useState('');
  const [walletType, setWalletType] = useState('ethereum'); // default wallet type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!publicKey.trim()) {
      setError('Please enter a public key.');
      return;
    }
    
    // Save the public key and the selected wallet type
    localStorage.setItem('publicKey', publicKey);
    localStorage.setItem('walletType', walletType);
    
    // Redirect to the dashboard where the account details will be loaded based on wallet type
    navigate('/verify-recovery-main');
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full border border-[#DAA520] rounded-lg p-8 text-white text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#DAA520]">Import Wallet</h1>
        
        <div className="mb-4">
          <label className="block mb-2">Select Wallet Type</label>
          <select
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
            className="w-full p-2 rounded-md text-white"
          >
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <input
          type="text"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="Enter your Public Key"
          className="w-full p-2 rounded-md mb-4 text-white"
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-[#DAA520] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#c99b1b] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}