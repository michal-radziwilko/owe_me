import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import UserSelector from "./UserSelector";
import User from "./User";
const AddTransactionModal = ({
  _sender,
  _receiver,
  _amount,
  isDebtSettlement = false,
}) => {
  const { closeAddTransactionModal, addTransaction, showAlert } =
    useGlobalContext();
  const [amount, setAmount] = useState(_amount ? _amount : "");
  const [sender, setSender] = useState(_sender ? _sender : {});
  const [receivers, setReceivers] = useState(_receiver ? [_receiver] : []);
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(sender).length > 0 && receivers.length > 0 && amount > 0) {
      const transaction = {
        id: sender.id.toString() + new Date().getTime().toString(),
        date: new Date(),
        sender,
        receivers,
        amount,
        description,
        isDebtSettlement,
      };
      addTransaction(transaction);
      handleCloseModal();
      showAlert(
        `${isDebtSettlement ? "DebtList" : "TransactionList"}`,
        "success",
        "Transaction Successfull"
      );
    } else {
      showAlert(
        `${isDebtSettlement ? "DebtList" : "TransactionList"}`,
        "danger",
        "Please select both transaction parties."
      );
    }
  };
  const clearTransaction = () => {
    setSender({});
    setReceivers([]);
    setAmount("");
  };
  const handleCloseModal = () => {
    closeAddTransactionModal();
    clearTransaction();
  };
  if (!isDebtSettlement)
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          {Object.keys(sender).length !== 0 ? (
            <div
              onClick={() => {
                if (!isDebtSettlement) {
                  setSender({});
                }
              }}
              className="selected-transaction-party modal-content-top-margin"
            >
              <User {...sender} />
            </div>
          ) : (
            <UserSelector
              setSelectedUsers={setSender}
              selectedusers={sender}
              isMultipleSelection={false}
            />
          )}
          <h3>payed for</h3>
          <UserSelector
            setSelectedUsers={setReceivers}
            selectedUsers={receivers}
          />
          <form onSubmit={handleSubmit}>
            <h4>description:</h4>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <h4>amount:</h4>
            <input
              className="amount-input"
              type="number"
              min="0.01"
              step="0.01"
              required={true}
              value={amount}
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
              }}
            />
            <button type="submit" className="submit-transaction-btn">
              submit
            </button>
          </form>
          <button
            className="close-AddTransactionModal-btn"
            onClick={handleCloseModal}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    );
  if (isDebtSettlement)
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h3 className="modal-content-top-margin">from</h3>
          <div className="selected-transaction-party">
            <User {...sender} />
          </div>
          <h3>to</h3>
          <div className="selected-transaction-party">
            <User {...receivers[0]} />
          </div>
          <h3>amount</h3>
          <form onSubmit={handleSubmit}>
            <h4>description:</h4>
            <input
              type="text"
              value={description ? description : "Debt settlement"}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <h4>amount:</h4>
            <input
              className="amount-input"
              type="number"
              min="0.01"
              step="0.01"
              required={true}
              value={amount}
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
              }}
            />
            <button type="submit" className="submit-transaction-btn">
              submit
            </button>
          </form>
          <button
            className="close-AddTransactionModal-btn"
            onClick={handleCloseModal}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    );
};
export default AddTransactionModal;
