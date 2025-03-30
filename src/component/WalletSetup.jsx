import React from "react";
import { Link } from "react-router";
import OptionCard from "./OptionCard";
import Logo from "./logo.png";
import "./styles.css";

const WalletSetup = () => {
    return (
        <div className="wallet-setup w-screen">
            <div className="wallet-header">
                <div className="wallet-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <h1>Welcome to MyWallet</h1>
                <p className="wallet-subtitle">Your favorite wallet awaits.</p>
                <p className="wallet-instruction">Choose how you'd like to set up your wallet:</p>
            </div>

            <div className="wallet-options">
                <Link
                    to="/login"
                >
                    <OptionCard title="Create New Wallet" />
                </Link>
                <Link
                    to="/import"
                >
                    <OptionCard title="Import Wallet" />
                </Link>
            </div>
        </div>
    );
};

export default WalletSetup;
