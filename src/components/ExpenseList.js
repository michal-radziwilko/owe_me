import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Expense from "./Expense";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { transactions } = useGlobalContext();
  const calculateExpenses = () => {
    /*
    ========== 
    TO DO: 
        TAKE INTO ACCOUNT DEBTS SETTLEMENTS
    ==========
    */
    let newExpenses = [...expenses];
    transactions.map((transaction) => {
      let userInExpenses = false;
      for (let i = 0; i < newExpenses.length; i++) {
        if (newExpenses[i].user.id === transaction.sender.id) {
          newExpenses[i].amount += transaction.amount;
          userInExpenses = true;
        }
      }
      if (!userInExpenses) {
        newExpenses = [
          ...newExpenses,
          { user: transaction.sender, amount: transaction.amount },
        ];
      }
    });
    setExpenses(newExpenses);
  };
  useEffect(() => {
    calculateExpenses();
  }, [transactions]);
  return (
    <div className="list-container">
      {expenses.map((expense) => {
        return <Expense {...expense} />;
      })}
    </div>
  );
};
export default ExpenseList;
