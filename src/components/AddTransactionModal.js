import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import UserSelector from "./UserSelector";
import User from "./User";
const AddTransactionModal = ({ _sender, _receiver, _amount }) => {
  const {
    isAddTransactionModalOpen,
    closeAddTransactionModal,
    addTransaction,
    showAlert,
  } = useGlobalContext();
  const [amount, setAmount] = useState(0);
  const [sender, setSender] = useState(_sender ? _sender : {});
  const [receiver, setReceiver] = useState(_receiver ? _receiver : {});
  useEffect(() => {
    if (_sender && _receiver && _amount) {
      setAmount(`${_amount}`);
      setSender(_sender);
      setReceiver(_receiver);
    }
  }, [_sender, _receiver, _amount]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(sender).length > 0 &&
      Object.keys(receiver).length > 0 &&
      amount > 0
    ) {
      const transaction = {
        id: new Date().getTime().toString(),
        date: new Date(),
        sender,
        receiver,
        amount,
      };
      addTransaction(transaction);
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
    setReceiver({});
    setAmount(0);
  };
  const handleCloseModal = () => {
    closeAddTransactionModal();
    clearTransaction();
  };
  return (
    <div
      className={`modal-overlay ${isAddTransactionModalOpen && "show-modal"}`}
    >
      <div className="modal-container">
        <h3>from:</h3>
        {Object.keys(sender).length !== 0 ? (
          <div
            onClick={() => {
              setSender({});
            }}
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
            onClick={() => {
              setReceiver({});
            }}
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
          onClick={handleCloseModal}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default AddTransactionModal;
