import { useContext, useState } from "react";
import TotalBalanceContext from "./context";

const netflixLogo = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

export default function TransactionAdd() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const globalState = useContext(TotalBalanceContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function addTransaction(e) {
    e.preventDefault();
    const {
      setTransactions,
      transactions,
      income,
      setIncome,
      totalBalance,
      setTotalBalance,
      expenses,
      setExpenses,
    } = globalState;

    const now = new Date();
    const parsedAmount = parseInt(amount);

    if (parsedAmount < 0 && totalBalance < Math.abs(parsedAmount)) {
      alert("Not enough money");
      return;
    }

    const newTransaction = {
      name: name,
      date: now.toLocaleDateString(),
      type: amount > 0 ? 1 : 0,
      price: amount,
      img: netflixLogo,
    };

    setTransactions([...transactions, newTransaction]);

    if (parsedAmount > 0) {
      setIncome(income + parsedAmount);
      setTotalBalance(income + parsedAmount);
    } else {
      setExpenses(expenses - parsedAmount);
      setTotalBalance(income - parsedAmount);
    }

    setName("");
    setAmount("");
  }

  return (
    <>
      <style>{`
        .transaction-add-card {
          width: 25%;
          margin-left: auto;
          margin-right: auto;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          background-color: #f1f1f1;
          color: #222;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .transaction-add-card.dark {
          background-color: #2F7E79;
          color: white;
        }

        .transaction-add-card h6 {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #dcdcdc;
          padding-bottom: 0.5rem;
        }

        .transaction-add-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transaction-add-form label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 0.3rem;
          display: block;
        }

        .transaction-add-form input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .transaction-add-form input:focus {
          border-color: #2F7E79;
          outline: none;
          box-shadow: 0 0 6px rgba(47, 126, 121, 0.5);
        }

        .transaction-add-btn {
          margin-top: 1.5rem;
          padding: 10px 0;
          border: none;
          border-radius: 10px;
          background-color: #2F7E79;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .transaction-add-btn:hover {
          background-color: #25655a;
        }

        @media (max-width: 768px) {
          .transaction-add-card {
            width: 100% !important;
            border-radius: 0;
            padding: 1rem;
          }
        }
      `}</style>

      <div className={`transaction-add-card ${globalState.theme ? "dark" : ""}`}>
        <h6>Add new transaction</h6>
        <form className="transaction-add-form" onSubmit={addTransaction}>
          <label htmlFor="transaction-name">Text</label>
          <input
            id="transaction-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Grocery, Rent"
          />

          <label htmlFor="transaction-amount">Amount</label>
          <input
            id="transaction-amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="e.g. 50.00"
          />

          <button type="submit" className="transaction-add-btn">
            Add transaction
          </button>
        </form>
      </div>
    </>
  );
}
