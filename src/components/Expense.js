import User from "./User";
import { useGlobalContext } from "../context";
const Expense = ({ user, amount }) => {
  const { currency } = useGlobalContext();
  return (
    <div className="expense">
      <User {...user} />
      <p>
        {amount}
        {currency}
      </p>
    </div>
  );
};
export default Expense;
