import { useContext } from "react";
import Context from "./context";

export default function Card(props) {
  const { income, expenses, totalBalance } = props;
  const { theme, setTheme } = useContext(Context);

  function toggleTheme() {
    setTheme((prev) => !prev);
  }

  return (
    <>
      <style>
        {`
          .card {
            width: 25%;
            margin-left: auto;
            margin-right: auto;
            transition: all 0.3s ease;
            border-radius: 16px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          .balance-label{
            padding-top:15px;
            padding-left:10px;
          }

          @media (max-width: 768px) {
            .card {
              width: 100% !important;
              margin: 0 !important;
              padding-left: 1rem;
              padding-right: 1rem;
              border-radius: 0;
            }
          }

          .top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
          }

          .balance-label {
            font-size: 16px;
            margin: 0;
            opacity: 0.8;
          }

          .balance-value {
            font-size: 36px;
            font-weight: 700;
            margin: 0;
            padding-left:10px;
            padding-right:10px;

          }

          .toggle-btn {
            font-size: 30px;
            background: none;
            border: none;
            cursor: pointer;
          }

          .bottom-row {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }

          .bottom-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .icon-label {
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-bottom: 4px;
            padding:10px;
          }

          .amount {
            font-size: 22px;
            font-weight: 600;
            margin: 0;
            padding-left:10px;
            padding-right:10px;
            padding-bottom:10px;
          }
        `}
      </style>

      <div
        className="card mt-5 p-4"
        style={{
          backgroundColor: theme ? "#2F7E79" : "#f1f1f1",
          color: theme ? "white" : "#222",
        }}
      >
        <div className="top-row">
          <div>
            <p className="balance-label">Total Balance</p>
            <p className="balance-value">$ {totalBalance}</p>
          </div>
          <button className="toggle-btn" onClick={toggleTheme}>
            {theme ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Нижний ряд: Income и Expenses */}
        <div className="bottom-row">
          <div className="bottom-item">
            <div className="icon-label text-success">
              <i className="fas fa-arrow-down"></i>
              <span className="ms-2">Income</span>
            </div>
            <p className="amount">$ {income}</p>
          </div>

          <div className="bottom-item">
            <div className="icon-label text-danger">
              <i className="fas fa-arrow-up"></i>
              <span className="ms-2">Expenses</span>
            </div>
            <p className="amount">$ {expenses}</p>
          </div>
        </div>
      </div>
    </>
  );
}
