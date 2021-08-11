import React from "react";
import { useGlobalContext } from "../context";
import User from "./User";
const UserList = () => {
  const { users } = useGlobalContext();
  return (
    <section className="list-container">
      {users.length > 0 ? (
        users &&
        users.map((user) => {
          return <User key={user.id} {...user} />;
        })
      ) : (
        <h3>no users</h3>
      )}
    </section>
  );
};
export default UserList;
