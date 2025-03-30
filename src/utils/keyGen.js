import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync, generateMnemonic } from "bip39";

// Generate a new mnemonic phrase
export const generateMnemonicPhrase = () => {
    return generateMnemonic();
};

// Generate Ethereum Wallet from Mnemonic
export const generateEthereumWallet = (mnemonic) => {
    return ethers.Wallet.fromMnemonic(mnemonic);
};

// Generate Solana Wallet from Mnemonic
export const generateSolanaWallet = (mnemonic) => {
    const seed = mnemonicToSeedSync(mnemonic).slice(0, 32);
    return Keypair.fromSeed(seed);
};
