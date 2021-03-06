import Debt from "./Debt";
import { useGlobalContext } from "../context";
import { useEffect, useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import Alert from "./Alert";
const DebtList = () => {
  const [debtsArray, setDebtsArray] = useState([]);
  const [debt, setDebt] = useState(null);
  const {
    users,
    openAddTransactionModal,
    alert,
    transactions,
    isAddTransactionModalOpen,
  } = useGlobalContext();
  const updateDebtsArray = () => {
    let newDebtsArray = [];
    users.forEach((user) => {
      if (user.debts.length > 0) {
        user.debts.forEach((debt) => {
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
    <div>
      {isAddTransactionModalOpen && (
        <AddTransactionModal {...debt} isDebtSettlement={true} />
      )}
      {alert.show && alert.component === "DebtList" && (
        <Alert type={alert.type} msg={alert.msg} list={transactions} />
      )}
      <div className="list-container">
        {debtsArray.length > 0 ? (
          debtsArray.map((debt) => {
            return (
              <div key={debt.id} onClick={() => handleClick(debt)}>
                <Debt {...debt} />
              </div>
            );
          })
        ) : (
          <h3>no debts</h3>
        )}
      </div>
    </div>
  );
};
export default DebtList;
