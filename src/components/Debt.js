import User from "./User";
const Debt = ({ debtor, creditor, amount }) => {
  return (
    <div className="debt">
      <User {...debtor} />
      <h3>owns</h3>
      <User {...creditor} />
      <h3>{amount}</h3>
    </div>
  );
};
export default Debt;
