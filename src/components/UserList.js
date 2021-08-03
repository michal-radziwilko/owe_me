import React from "react";
import { useGlobalContext } from "../context";
import User from "./User";
const UserList = () => {
  const { users } = useGlobalContext();
  return (
    <section className="list-container">
      {users &&
        users.map((user) => {
          return <User key={user.id} {...user} />;
        })}
    </section>
  );
};
export default UserList;
