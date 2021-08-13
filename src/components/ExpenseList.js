import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Expense from "./Expense";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { transactions } = useGlobalContext();
  const calculateExpenses = () => {
    let newExpenses = [...expenses];
    transactions.forEach((transaction) => {
      const amount = parseFloat(
        Math.round(
          (transaction.amount / transaction.receivers.length + Number.EPSILON) *
            100
        ) / 100
      );
      transaction.receivers.forEach((receiver) => {
        let senderInExpenses = false;
        for (let i = 0; i < newExpenses.length; i++) {
          if (
            newExpenses[i].user.id === receiver.id &&
            !transaction.isDebtSettlement
          ) {
            newExpenses[i].amount += amount;
            senderInExpenses = true;
          }
        }
        if (!senderInExpenses && !transaction.isDebtSettlement) {
          newExpenses = [
            ...newExpenses,
            {
              id: new Date().getTime().toString() + receiver.id,
              user: receiver,
              amount,
            },
          ];
        }
      });
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
