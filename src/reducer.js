const reducer = (state, action) => {
  if (action.type === "ADD_USERS") {
    return { ...state, users: [...state.users, ...action.payload.newUsers] };
  }
  if (action.type === "OPEN_ADD_TRANSACTION_MODAL") {
    return { ...state, isAddTransactionModalOpen: true };
  }
  if (action.type === "CLOSE_ADD_TRANSACTION_MODAL") {
    return {
      ...state,
      isAddTransactionModalOpen: false,
    };
  }
  if (action.type === "ADD_TRANSACTION") {
    return { ...state, transactions: [...state.transactions, action.payload] };
  }
  if (action.type === "UPDATE_DEBTS") {
    console.log("UPDATE_DEBTS");
    const sender = action.payload.sender;
    const receiver = action.payload.receiver;
    const amount = action.payload.amount;
    const debt = { creditor: sender, amount };
    const newUsers = state.users.map((user) => {
      if (user.id === receiver.id) {
        let isCreditor = false;
        for (let i = 0; i < user.debts.length; i++) {
          if (user.debts[i].creditor.id === sender.id) {
            user.debts[i].amount += amount;
            isCreditor = true;
          }
        }
        if (!isCreditor) {
          user.debts = [...user.debts, debt];
          console.log(debt);
        }
      }
      return user;
    });
    return { ...state, users: newUsers };
  }
  throw new Error("no matching action type");
};
export default reducer;
