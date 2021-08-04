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
      let receiverInExpenses = false;
      for (let i = 0; i < newExpenses.length; i++) {
        if (newExpenses[i].user.id === transaction.sender.id) {
          newExpenses[i].amount += transaction.amount;
          senderInExpenses = true;
        }
        if (newExpenses[i].user.id === transaction.receiver.id) {
          newExpenses[i].amount -= transaction.amount;
          receiverInExpenses = true;
        }
      }
      if (!senderInExpenses) {
        newExpenses = [
          ...newExpenses,
          { user: transaction.sender, amount: transaction.amount },
        ];
      }
      if (!receiverInExpenses) {
        newExpenses = [
          ...newExpenses,
          { user: transaction.receiver, amount: -transaction.amount },
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
