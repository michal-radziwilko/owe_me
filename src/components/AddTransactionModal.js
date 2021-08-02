import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import UserSelector from "./UserSelector";
import User from "./User";
const AddTransactionModal = () => {
  const {
    isAddTransactionModalOpen,
    closeAddTransactionModal,
    addTransaction,
  } = useGlobalContext();
  const [amount, setAmount] = useState(0);
  const [sender, setSender] = useState({});
  const [receiver, setReceiver] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: new Date().getTime().toString(),
      date: new Date(),
      sender,
      receiver,
      amount,
    };
    addTransaction(transaction);
  };
  const clearTransactionSender = () => {
    setSender({});
  };
  const clearTransactionReceiver = () => {
    setReceiver({});
  };
  return (
    <div
      className={`modal-overlay ${isAddTransactionModalOpen && "show-modal"}`}
    >
      <div className="modal-container">
        <h3>from:</h3>
        {Object.keys(sender).length !== 0 ? (
          <div
            onClick={clearTransactionSender}
            className="selected-transaction-party"
          >
            <User {...sender} />
          </div>
        ) : (
          <UserSelector setUser={setSender} />
        )}
        <h3>to:</h3>
        {Object.keys(receiver).length !== 0 ? (
          <div
            onClick={clearTransactionReceiver}
            className="selected-transaction-party"
          >
            <User {...receiver} />
          </div>
        ) : (
          <UserSelector setUser={setReceiver} />
        )}
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
        </form>
        <button
          className="close-AddTransactionModal-btn"
          onClick={closeAddTransactionModal}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default AddTransactionModal;
