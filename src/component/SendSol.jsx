import React, { useState } from "react";
import { sendSolanaTransaction } from "../utils/Solona.js";

const SendSolana = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const privateKey = localStorage.getItem("wallet_private_key");

    const handleSend = async () => {
        await sendSolanaTransaction(privateKey, recipient, amount);
    };

    return (
        <div>
            <h3>Send Solana</h3>
            <input type="text" placeholder="Recipient" onChange={(e) => setRecipient(e.target.value)} />
            <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleSend}>Send SOL</button>
        </div>
    );
};

export default SendSolana;
