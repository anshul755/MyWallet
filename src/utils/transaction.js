import { ethers } from "ethers";
import { Connection, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

// Send Ethereum Transaction
export const sendEthereumTransaction = async (to, amount, wallet) => {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY");
    const signer = wallet.connect(provider);

    const tx = {
        to,
        value: ethers.utils.parseEther(amount),
        gasLimit: 21000,
    };

    return await signer.sendTransaction(tx);
};

// Send Solana Transaction
export const sendSolanaTransaction = async (to, amount, keypair) => {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const transaction = new Transaction(); // Add Solana-specific transaction details
    return await sendAndConfirmTransaction(connection, transaction, [keypair]);
};
