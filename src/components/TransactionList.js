import React from "react";
import { useGlobalContext } from "../context";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { transactions, openAddTransactionModal } = useGlobalContext();
  return (
    <div>
      <button className="add-btn" onClick={openAddTransactionModal}>
        +
      </button>
      <section className="transaction-list">
        {transactions.length > 0 ? (
          <div className="transaction-list-headers">
            <p>from</p>
            <p>to</p>
            <p>date</p>
            <p>amount</p>
          </div>
        ) : (
          <h3>no transactions</h3>
        )}
        {transactions &&
          transactions.map((transaction) => {
            return <Transaction key={transaction.id} {...transaction} />;
          })}
      </section>
    </div>
  );
};
export default TransactionList;
