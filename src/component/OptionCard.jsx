import React from "react";
import "./styles.css"; 

const OptionCard = ({ title, onClick }) => {
  return (
    <div className="option-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <p className="text-white hover:text-black">{title}</p>
    </div>
  );
};

export default OptionCard;
