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
    const receivers = action.payload.receivers;
    const amount = action.payload.amount;
    let debtAmount = parseFloat(
      Math.round((amount / receivers.length + Number.EPSILON) * 100) / 100
    );
    let newUsers = state.users;
    receivers.forEach((receiver) => {
      let debtId = new Date().getTime().toString();
      if (receiver.id !== sender.id) {
        debtId += receiver.id;
        sender.debts.forEach((debt) => {
          if (debt.creditor.id === receiver.id) {
            debtAmount -= debt.amount;
          }
        });
        // debtAmount === 0 => sender was debtor and he settled the debt
        // debtAmount < 0 => sender is debtor (sender was already debtor and still is)
        // debtAmount > 0 => receiver is debtor (sender was debtor
        // and transered more than the debt || receiver was debtor || there were no debts between them)
        newUsers = newUsers.map((user) => {
          let newDebts = user.debts;
          if (user.id === receiver.id) {
            // if receiver is senders debtor
            if (debtAmount > 0) {
              let receiverWasAlreadyDebtor = false;
              newDebts = newDebts.map((debt) => {
                // if receiver was already senders debtor => update his debt
                if (debt.creditor.id === sender.id) {
                  receiverWasAlreadyDebtor = true;
                  return { ...debt, amount: debt.amount + debtAmount };
                }
                return debt;
              });
              // if receiver wasn't senders debtor => add his debt
              if (!receiverWasAlreadyDebtor) {
                newDebts = [
                  ...newDebts,
                  {
                    id: debtId,
                    debtor: receiver,
                    creditor: sender,
                    amount: debtAmount,
                  },
                ];
              }
            }
            return { ...user, debts: newDebts };
          }
          if (user.id === sender.id) {
            // if receiver is senders debtor
            if (debtAmount > 0) {
              // if receiver was sender creditor => delete this debt
              newDebts = newDebts.filter(
                (debt) => debt.creditor.id !== receiver.id
              );
            }
            //
            if (debtAmount < 0) {
              // if receiver was senders creditor and sender transefed him less
              // than his debt was => update this debt
              newDebts = newDebts.map((debt) => {
                if (debt.creditor.id === receiver.id) {
                  return { ...debt, amount: Math.abs(debtAmount) };
                }
                return debt;
              });
            }
            // if receiver was senders creditor
            // and this is full settlement of this debt => delete this debt
            if (debtAmount === 0) {
              newDebts = newDebts.filter(
                (debt) => debt.creditor.id !== receiver.id
              );
            }
            return { ...user, debts: newDebts };
          }
          return user;
        });
      }
    });
    return { ...state, users: newUsers };
  }
  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      alert: { show: true, msg: action.payload.msg, type: action.payload.type },
    };
  }
  if (action.type === "HIDE_ALERT") {
    return {
      ...state,
      alert: {
        show: false,
        msg: "",
        type: "",
      },
    };
  }
  throw new Error("no matching action type");
};
export default reducer;
