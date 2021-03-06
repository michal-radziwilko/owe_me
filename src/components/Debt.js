import User from "./User";
import { useGlobalContext } from "../context";
const Debt = ({ debtor, creditor, amount }) => {
  const { currency } = useGlobalContext();
  return (
    <div className="debt">
      <User {...debtor} />
      <h3>owes</h3>
      <User {...creditor} />
      <p>
        {amount}
        {currency}
      </p>
    </div>
  );
};
export default Debt;
