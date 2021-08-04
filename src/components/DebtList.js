import Debt from "./Debt";
import { useGlobalContext } from "../context";
import { useEffect, useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
const DebtList = () => {
  const [debtsArray, setDebtsArray] = useState([]);
  const [debt, setDebt] = useState(null);
  const { users, openAddTransactionModal } = useGlobalContext();
  const updateDebtsArray = () => {
    let newDebtsArray = [];
    users.map((user) => {
      if (user.debts.length > 0) {
        user.debts.map((debt) => {
          newDebtsArray.push({ ...debt, debtor: user });
        });
      }
    });
    setDebtsArray(newDebtsArray);
  };
  useEffect(() => {
    updateDebtsArray();
  }, [users]);
  const handleClick = (debt) => {
    setDebt({
      _sender: debt.debtor,
      _receiver: debt.creditor,
      _amount: debt.amount,
    });
    openAddTransactionModal();
  };
  return (
    <div className="list-container">
      {<AddTransactionModal {...debt} />}
      {debtsArray.map((debt) => {
        return (
          <div key={debt.id} onClick={() => handleClick(debt)}>
            <Debt {...debt} />
          </div>
        );
      })}
    </div>
  );
};
export default DebtList;
