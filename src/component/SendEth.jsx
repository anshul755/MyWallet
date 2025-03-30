import React, { useState } from "react";
import { sendEthereumTransaction } from "../utils/Ethereum.js";

const SendEthereum = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const privateKey = localStorage.getItem("wallet_private_key");

    const handleSend = async () => {
        await sendEthereumTransaction(privateKey, recipient, amount);
    };

    return (
        <div>
            <h3>Send Ethereum</h3>
            <input type="text" placeholder="Recipient" onChange={(e) => setRecipient(e.target.value)} />
            <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleSend}>Send ETH</button>
        </div>
    );
};

export default SendEthereum;
