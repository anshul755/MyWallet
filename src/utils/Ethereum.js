import { ethers } from "ethers";

// Replace with your own Infura/Alchemy project ID or another provider URL
const INFURA_PROJECT_ID = "103f3d91a29d4f80839ec7712e027e17";
const providerUrl = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

// Initialize a provider
const provider = new ethers.JsonRpcProvider(providerUrl);

/**
 * Sends an Ethereum transaction.
 *
 * @param {string} privateKey - The sender's private key.
 * @param {string} toAddress - The recipient's Ethereum address.
 * @param {number|string} amount - The amount in ETH to send.
 * @returns {Promise<string>} - The transaction hash.
 */
export const sendEthereumTransaction = async (privateKey, toAddress, amount) => {
  try {
    // Create a wallet instance with the private key and connect it to the provider.
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create the transaction object.
    const tx = {
      to: toAddress,
      value: ethers.parseEther(amount.toString()), // Converts ETH to Wei.
      gasLimit: 21000, // Standard gas limit for ETH transfers.
      gasPrice: await provider.getGasPrice(), // Fetch the current gas price.
    };

    // Sign and send the transaction.
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transaction sent! Hash:", txResponse.hash);

    // Wait for the transaction to be mined (confirmed).
    await txResponse.wait();
    console.log("Transaction confirmed!");

    return txResponse.hash;
  } catch (error) {
    console.error("Error sending Ethereum transaction:", error);
    throw error;
  }
};

/**
 * Fetches the balance of an Ethereum address.
 *
 * @param {string} address - The Ethereum address.
 * @returns {Promise<string>} - The balance in ETH.
 */
export const fetchEthereumBalance = async (address) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching Ethereum balance:", error);
    throw error;
  }
};
