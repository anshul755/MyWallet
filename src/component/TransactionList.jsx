import "./wallet.css";

const transactions = [
  { id: 1, type: "Sent", amount: "-$250.00", date: "2025-03-28" },
  { id: 2, type: "Received", amount: "+$1,500.00", date: "2025-03-27" },
  { id: 3, type: "Sent", amount: "-$75.50", date: "2025-03-26" },
];

const TransactionList = () => {
  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} className="transaction-item">
            <span className="tx-type">{tx.type}</span>
            <span className="tx-amount">{tx.amount}</span>
            <span className="tx-date">{tx.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;