import React, { useState } from 'react';
import { Link } from 'react-router';
import CryptoJS from 'crypto-js';
import './PasswordSetup.css';

export default function PasswordSetup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleClick = (e) => {
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your password');
      e.preventDefault();
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      e.preventDefault();
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      e.preventDefault();
      return;
    }
    setError('');

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const storedPasswords = JSON.parse(localStorage.getItem("userPasswords") || "[]");
    storedPasswords.push(hashedPassword);

    localStorage.setItem("userPasswords", JSON.stringify(storedPasswords));
  };

  return (
    <div className="password-setup-wrapper flex items-center justify-center w-screen h-screen bg-gray-900 text-white">
      <div className="password-setup-container bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Choose a Password</h1>
        <p className="subtitle text-gray-400 mb-4">You'll use it to unlock your wallet.</p>

        <div className="input-group mb-3">
          <label htmlFor="password" className="block mb-1">Choose Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="input-group mb-3">
          <label htmlFor="confirmPassword" className="block mb-1">Re-enter Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        {error && <p className="error-message text-red-500 mb-3">{error}</p>}

        <Link
          to="/secretRecoveryPhrase"
          onClick={handleClick}
          className="block text-center bg-[#333] text-white hover:bg-[#DAA520] hover:text-black transition-colors px-6 py-2 rounded font-semibold w-full"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
