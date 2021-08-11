import React from "react";
import { useGlobalContext } from "../context";
import Transaction from "./Transaction";
import Alert from "./Alert";
import AddTransactionModal from "./AddTransactionModal";

const TransactionList = () => {
  const {
    transactions,
    openAddTransactionModal,
    alert,
    isAddTransactionModalOpen,
  } = useGlobalContext();
  return (
    <div>
      {isAddTransactionModalOpen && <AddTransactionModal />}
      <button className="add-btn" onClick={openAddTransactionModal}>
        +
      </button>
      {alert.show && (
        <Alert type={alert.type} msg={alert.msg} list={transactions} />
      )}
      <div className="list-container">
        {transactions.length > 0 ? (
          <div className="transaction-list-headers">
            <p>from</p>
            <p>to</p>
            <p>date</p>
            <p>amount</p>
          </div>
        ) : (
          <h3>no transactions (click the "+" button to add transactions)</h3>
        )}
        {transactions &&
          transactions.map((transaction) => {
            return (
              !transaction.isDebtSettlement && (
                <Transaction key={transaction.id} {...transaction} />
              )
            );
          })}
      </div>
    </div>
  );
};
export default TransactionList;
