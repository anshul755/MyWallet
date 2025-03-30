import {
    Connection,
    PublicKey,
    Keypair,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  
  // Replace with your desired Solana RPC endpoint (mainnet, devnet, or testnet)
  const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
  const connection = new Connection('https://cosmological-alpha-valley.solana-devnet.quiknode.pro/b8c8bc72ccf96c24c38d2490b8f6520c1ecf7e41/', "confirmed");
  
  /**
   * Sends a Solana transaction.
   *
   * @param {string} privateKey - The sender's private key stored as a JSON string of an array.
   * @param {string} toAddress - The recipient's Solana address.
   * @param {number|string} amount - The amount in SOL to send.
   * @returns {Promise<string>} - The transaction signature.
   */
  export const sendSolanaTransaction = async (privateKey, toAddress, amount) => {
    try {
      // Parse and convert the private key from local storage (assumed stored as a JSON string)
      const secretKey = Uint8Array.from(JSON.parse(privateKey));
      const senderKeypair = Keypair.fromSecretKey(secretKey);
  
      // Create a transaction to transfer SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amount * 1e9, // Convert SOL to lamports (1 SOL = 1e9 lamports)
        })
      );
  
      // Sign and send the transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
      ]);
      console.log("Transaction confirmed! Signature:", signature);
      return signature;
    } catch (error) {
      console.error("Error sending Solana transaction:", error);
      throw error;
    }
  };
  
  /**
   * Fetches the balance of a Solana wallet.
   *
   * @param {string} address - The Solana wallet address.
   * @returns {Promise<number>} - The wallet balance in SOL.
   */
  export const fetchSolanaBalance = async (address) => {
    try {
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      // Convert balance from lamports to SOL
      return balance / 1e9;
    } catch (error) {
      console.error("Error fetching Solana balance:", error);
      throw error;
    }
  };
  