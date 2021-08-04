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
    const sender = action.payload.sender;
    const receiver = action.payload.receiver;
    const amount = action.payload.amount;
    const debtId = new Date().getTime().toString();
    let debtAmount = amount;
    let creditorId = sender.id;
    let debtorId = receiver.id;
    sender.debts.map((debt) => {
      if (debt.creditor.id === receiver.id) {
        debtAmount -= debt.amount;
      }
    });
    if (debtAmount < 0) {
      debtorId = sender.id;
      creditorId = receiver.id;
    }
    const debt = { creditor: sender, amount: Math.abs(debtAmount), id: debtId };
    let newUsers = [];
    if (debtAmount === 0) {
      newUsers = state.users.map((user) => {
        if (user.id === sender.id) {
          user.debts = user.debts.filter(
            (debt) => debt.creditor.id !== receiver.id
          );
        }
        return user;
      });
    } else {
      newUsers = state.users.map((user) => {
        if (user.id === debtorId) {
          let allreadyCreditor = false;
          for (let i = 0; i < user.debts.length; i++) {
            if (user.debts[i].creditor.id === creditorId) {
              user.debts[i] = {
                ...user.debts[i],
                amount: Math.abs(debtAmount),
                id: debtId,
              };
              allreadyCreditor = true;
            }
          }
          if (!allreadyCreditor) {
            user.debts = [...user.debts, debt];
          }
        }
        return user;
      });
    }
    return { ...state, users: newUsers };
  }
  throw new Error("no matching action type");
};
export default reducer;
