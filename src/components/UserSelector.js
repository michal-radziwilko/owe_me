import React from "react";
import { useGlobalContext } from "../context";
import User from "./User";
const UserSelector = ({ setUser }) => {
  const { users, setTransactionParty } = useGlobalContext();
  const handleSelect = (user) => {
    setUser(user);
  };
  return (
    <ul className="user-selector-list">
      {users &&
        users.map((user) => {
          return (
            <li key={user.id} onClick={() => handleSelect(user)}>
              <User {...user} />
            </li>
          );
        })}
    </ul>
  );
};
export default UserSelector;
