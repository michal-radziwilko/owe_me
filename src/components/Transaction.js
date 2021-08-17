import React from "react";
import User from "./User";
import { useGlobalContext } from "../context";
const Transaction = ({ sender, receivers, amount, date, description }) => {
  const { currency } = useGlobalContext();
  const formatDate = (date) => {
    return (
      date.getDate() +
      "." +
      (date.getMonth() < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "." +
      date.getFullYear()
    );
  };
  const formatTime = (date) => {
    return (
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    );
  };
  return (
    <div className="transaction">
      <div className="date">
        <p>{formatDate(date)}</p>
        <p className="time">{formatTime(date)}</p>
      </div>
      <p className="transaction-description">{description}</p>
      <div className="transaction-sender">
        <User {...sender} />
        <h4>
          payed {amount}
          {currency} for:
        </h4>
      </div>
      <div className="transaction-receiver-list">
        {receivers.map((receiver) => {
          return (
            <div key={receiver.id} className="transaction-receiver">
              <User {...receiver} />
              <p>
                {parseFloat(
                  Math.round(
                    (amount / receivers.length + Number.EPSILON) * 100
                  ) / 100
                )}
                {currency}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Transaction;
