import React from "react";
import User from "./User";
const Transaction = ({ sender, receiver, amount, date }) => {
  return (
    <div className="transaction-container">
      <User {...sender} />
      <User {...receiver} />
      <p>
        {date.getDate() +
          "." +
          (date.getMonth() < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "." +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()}
      </p>
      <p>{amount}</p>
    </div>
  );
};
export default Transaction;
