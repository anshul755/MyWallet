import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import { sendEthereumTransaction } from "../utils/Ethereum.js";
import { sendSolanaTransaction } from "../utils/Solona.js";
import Logo from './logo.png';

const WalletDashboard = () => {
  const [balance, setBalance] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [walletType, setWalletType] = useState("ethereum");
  const [showSendForm, setShowSendForm] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txResult, setTxResult] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("publicKey");
    const storedWalletType = localStorage.getItem("walletType") || "ethereum";
    setPublicKey(storedKey);
    setWalletType(storedWalletType);

    const fetchBalance = async () => {
      try {
        if (storedWalletType === "ethereum" && storedKey) {
          const provider = new ethers.JsonRpcProvider(
            `https://mainnet.infura.io/v3/103f3d91a29d4f80839ec7712e027e17`
          );
          const balanceBigNumber = await provider.getBalance(storedKey);
          setBalance(ethers.formatEther(balanceBigNumber));
        } else if (storedWalletType === "solana" && storedKey) {
          const connection = new Connection('https://cosmological-alpha-valley.solana-devnet.quiknode.pro/b8c8bc72ccf96c24c38d2490b8f6520c1ecf7e41/', 'confirmed');
          const solanaPublicKey = new PublicKey(storedKey);
          const lamports = await connection.getBalance(solanaPublicKey);
          // Convert lamports to SOL (1 SOL = 1e9 lamports)
          setBalance(lamports / 1e9);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (storedKey) fetchBalance();
  }, []);

  const handleSendTransaction = async () => {
    try {
      const privateKey = localStorage.getItem("wallet_private_key");
      let result;
      if (walletType === "ethereum") {
        result = await sendEthereumTransaction(privateKey, recipient, amount);
      } else if (walletType === "solana") {
        result = await sendSolanaTransaction(privateKey, recipient, amount);
      }
      setTxResult(result);
      alert(`Transaction successful: ${result}`);
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-black w-screen min-h-screen text-white">
      <img src={Logo} alt="MyWallet Logo" className="w-32 mb-6" />
      <h2 className="text-3xl font-bold mb-2">Welcome to MyWallet</h2>
      <p className="text-lg text-gray-300 mb-8">Your favorite wallet awaits.</p>

      {balance !== null ? (
        <p className="text-2xl font-semibold text-green-400">
          Balance: {balance} {walletType === "solana" ? "SOL" : "ETH"}
        </p>
      ) : (
        <p>Loading balance...</p>
      )}
      <button
        onClick={() =>
          alert(`Your current balance is: ${balance || 0} ${walletType === "solana" ? "SOL" : "ETH"}`)
        }
        className="mt-6 bg-black-200 hover:text-black hover:bg-yellow-500 transition delay-20"
      >
        Check Balance
      </button>

      <div className="mt-10">
        <button
          onClick={() => setShowSendForm(!showSendForm)}
          className="bg-black-200 hover:text-black hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          {showSendForm ? "Cancel" : "Send Transaction"}
        </button>

        {showSendForm && (
          <div className="mt-4 p-4 border border-gray-700 rounded">
            <h3 className="text-xl mb-2">Send {walletType === "solana" ? "SOL" : "ETH"}</h3>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="p-2 mb-2 rounded text-white"
            />
            <br />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 mb-2 rounded text-white"
            />
            <br />
            <button
              onClick={handleSendTransaction}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Send {walletType === "solana" ? "SOL" : "ETH"}
            </button>
          </div>
        )}
      </div>
      {txResult && (
        <p className="mt-4 text-sm text-yellow-400">Transaction Result: {txResult}</p>
      )}
    </div>
  );
};

export default WalletDashboard;
