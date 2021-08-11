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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(sender).length > 0 && receivers.length > 0 && amount > 0) {
      receivers.forEach((receiver) => {
        const transaction = {
          id: receiver.id.toString() + new Date().getTime().toString(),
          date: new Date(),
          sender,
          receiver,
          amount: parseFloat(
            Math.round((amount / receivers.length + Number.EPSILON) * 100) / 100
          ),
          isDebtSettlement,
        };
        addTransaction(transaction);
      });
      showAlert("success", "Transaction Successfull");
    } else {
      showAlert(
        "danger",
        "Transaction failed. Please select both transaction parties."
      );
    }
    handleCloseModal();
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
              className="selected-transaction-party"
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
          <h3>amount</h3>
          <form onSubmit={handleSubmit}>
            <input
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
          <h3>from</h3>
          <div className="selected-transaction-party">
            <User {...sender} />
          </div>
          <h3>to</h3>
          <User {...receivers[0]} />
          <h3>amount</h3>
          <form onSubmit={handleSubmit}>
            <input
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
