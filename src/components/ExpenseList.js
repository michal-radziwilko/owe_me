import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Expense from "./Expense";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { transactions } = useGlobalContext();
  const calculateExpenses = () => {
    let newExpenses = [...expenses];
    transactions.map((transaction) => {
      let senderInExpenses = false;
      for (let i = 0; i < newExpenses.length; i++) {
        if (
          newExpenses[i].user.id === transaction.sender.id &&
          transaction.isDebtSettlement
        ) {
          newExpenses[i].amount -= transaction.amount;
          senderInExpenses = true;
        }
      }
      if (!senderInExpenses && transaction.isDebtSettlement) {
        newExpenses = [
          ...newExpenses,
          {
            id: new Date().getTime().toString() + transaction.sender.id,
            user: transaction.sender,
            amount: transaction.amount,
          },
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
      {expenses.length > 0 ? (
        expenses.map((expense) => {
          return <Expense key={expense.id} {...expense} />;
        })
      ) : (
        <h3>no expenses</h3>
      )}
    </div>
  );
};
export default ExpenseList;
