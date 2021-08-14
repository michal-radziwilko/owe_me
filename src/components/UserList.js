import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import User from "./User";
const UserList = () => {
  const { users, currency } = useGlobalContext();
  const [userBalance, setUserBalance] = useState(new Map());
  const calculateUserBalance = () => {
    let newUserBalance = new Map();
    users.forEach((user) => {
      newUserBalance.set(user.id, 0);
      user.debts.forEach((debt) => {
        newUserBalance.set(user.id, newUserBalance.get(user.id) - debt.amount);
      });
      users.forEach((otherUser) => {
        if (otherUser.id !== user.id) {
          otherUser.debts.forEach((otherDebt) => {
            if (otherDebt.creditor.id === user.id) {
              newUserBalance.set(
                user.id,
                newUserBalance.get(user.id) + otherDebt.amount
              );
            }
          });
        }
      });
    });
    setUserBalance(newUserBalance);
  };
  useEffect(() => {
    calculateUserBalance();
  }, [users]);
  return (
    <section className="list-container">
      {users.length > 0 ? (
        users &&
        users.map((user) => {
          return (
            <div className="user-list-item" key={user.id}>
              <User {...user} />
              <p
                className={
                  userBalance.get(user.id) >= 0
                    ? "positive-user-balance"
                    : "negative-user-balance"
                }
              >
                {userBalance.get(user.id) > 0
                  ? `+${userBalance.get(user.id)}`
                  : userBalance.get(user.id)}
                {currency}
              </p>
            </div>
          );
        })
      ) : (
        <h3>no users</h3>
      )}
    </section>
  );
};
export default UserList;
