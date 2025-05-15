import { useState } from "react";
import './App.css';
import TransactionAdd from './components/TransactionAdd';
import TransactionHistory from './components/TransactionHistory';
import Card from './components/Card';
import TotalBalanceContext from './components/context';

const initialTransactions = [
  {
    name: "Netflix Subscription",
    date: new Date().toLocaleDateString(),
    type: 0,
    price: -15,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    name: "Upwork Payment",
    date: new Date().toLocaleDateString(),
    type: 1,
    price: 300,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png"
  }
];

function App() {
  const [theme, setTheme] = useState(true); // true = dark, false = light
  const [transactions, setTransactions] = useState(initialTransactions);
  const [income, setIncome] = useState(
    initialTransactions.filter(t => t.type === 1).reduce((acc, t) => acc + Number(t.price), 0)
  );
  const [expenses, setExpenses] = useState(
    initialTransactions.filter(t => t.type === 0).reduce((acc, t) => acc + Math.abs(Number(t.price)), 0)
  );
  const [totalBalance, setTotalBalance] = useState(income - expenses);

  const contextValue = {
    theme,
    setTheme,
    transactions,
    setTransactions,
    income,
    setIncome,
    expenses,
    setExpenses,
    totalBalance,
    setTotalBalance
  };

  return (
    <TotalBalanceContext.Provider value={contextValue}>
      {/* <div style={{ backgroundColor: theme ? '#1c1c1c' : '#ffffff', minHeight: '100%' }}> */}
        <Card income={income} expenses={expenses} totalBalance={totalBalance} />
        <TransactionHistory transactions={transactions} />
        <TransactionAdd />
      {/* </div> */}
    </TotalBalanceContext.Provider>
  );
}

export default App;
