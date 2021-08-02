import Debt from "./Debt";
import { useGlobalContext } from "../context";
const DebtList = () => {
  const { users } = useGlobalContext();
  const debtsArray = () => {
    let arr = [];
    users.map((user) => {
      if (user.debts.length > 0) {
        arr = user.debts.map((debt, index) => {
          const id = new Date().getTime().toString() + index;
          console.log(debt);
          return { ...debt, debtor: user, id };
        });
      }
    });
    return arr;
  };
  return (
    <div className="debt-list">
      <button className="add-btn">+</button>
      {debtsArray().map((debt) => {
        return <Debt key={debt.id} {...debt} />;
      })}
    </div>
  );
};
export default DebtList;
