import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const initialValue = {
    users: [],
    transactions: [],
    isAddTransactionModalOpen: false,
    transactionSender: {},
    transactionReceiver: {},
    currency: "$",
    alert: {
      show: false,
      type: "",
      msg: "",
    },
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const fetchUsers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const users = data.results;
      const newUsers = [];
      users.forEach((user) => {
        const { first, last } = user.name;
        const { large } = user.picture;
        const { uuid } = user.login;
        const newUser = {
          id: uuid,
          name: `${first} ${last}`,
          image: large,
          debts: [],
        };
        newUsers.push(newUser);
      });
      return newUsers;
    } catch (error) {
      console.log(error);
    }
  };
  const addUsers = (usersAmount) => {
    const url = `https://randomuser.me/api/?results=${usersAmount}`;
    fetchUsers(url).then((newUsers) => {
      dispatch({ type: "ADD_USERS", payload: { newUsers } });
    });
  };
  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    dispatch({ type: "UPDATE_DEBTS", payload: transaction });
  };
  const openAddTransactionModal = () => {
    dispatch({ type: "OPEN_ADD_TRANSACTION_MODAL" });
  };
  const closeAddTransactionModal = () => {
    dispatch({ type: "CLOSE_ADD_TRANSACTION_MODAL" });
  };
  const showAlert = (type, msg) => {
    dispatch({ type: "SHOW_ALERT", payload: { msg, type } });
  };
  const hideAlert = () => {
    dispatch({ type: "HIDE_ALERT" });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        addUsers,
        addTransaction,
        openAddTransactionModal,
        closeAddTransactionModal,
        showAlert,
        hideAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
