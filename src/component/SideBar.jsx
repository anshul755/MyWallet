import React from "react";
import "./wallet.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">MyWallet</h2>
      <ul className="sidebar-menu">
        <li className="menu-item active">Dashboard</li>
        <li className="menu-item">Transactions</li>
        <li className="menu-item">Settings</li>
        <li className="menu-item">Support</li>
      </ul>
    </div>
  );
};

export default Sidebar;
