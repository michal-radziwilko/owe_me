import { react, useState, useEffect } from "react";
import defaultUser from "../defaultUser.svg";
const User = ({ name, image }) => {
  return (
    <div className="user">
      <img src={defaultUser && image} alt={name} />
      <h4>{name}</h4>
    </div>
  );
};
export default User;
