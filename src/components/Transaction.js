import React from "react";
import User from "./User";
import { useGlobalContext } from "../context";
const Transaction = ({ sender, receiver, amount, date }) => {
  const { currency } = useGlobalContext();
  const formatDate = (date) => {
    return (
      date.getDate() +
      "." +
      (date.getMonth() < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    );
  };
  return (
    <div className="transaction">
      <User {...sender} />
      <User {...receiver} />
      <p>{formatDate(date)}</p>
      <p>
        {amount}
        {currency}
      </p>
    </div>
  );
};
export default Transaction;
