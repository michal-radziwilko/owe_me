import Debt from "./Debt";
import { useGlobalContext } from "../context";
import { useEffect, useState } from "react";
const DebtList = () => {
  const [debtsArray, setDebtsArray] = useState([]);
  const { users } = useGlobalContext();
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
  return (
    <div className="list-container">
      {debtsArray.map((debt) => {
        return <Debt key={debt.id} {...debt} />;
      })}
    </div>
  );
};
export default DebtList;
