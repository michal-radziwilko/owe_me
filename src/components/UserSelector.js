import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import User from "./User";
const UserSelector = ({
  selectedUsers,
  setSelectedUsers,
  isMultipleSelection = true,
}) => {
  useEffect(() => {}, [selectedUsers]);
  const { users } = useGlobalContext();
  const checkIfUserSelected = (checkUser) => {
    let result = false;
    selectedUsers.map((selectedUser) => {
      if (selectedUser.id === checkUser.id) {
        result = true;
      }
    });
    return result;
  };
  const handleSelect = (selectedUser) => {
    if (isMultipleSelection) {
      if (!checkIfUserSelected(selectedUser)) {
        setSelectedUsers([...selectedUsers, selectedUser]);
      } else {
        let newSelectedUsers = selectedUsers.filter(
          (user) => user.id !== selectedUser.id
        );
        setSelectedUsers(newSelectedUsers);
      }
    } else {
      setSelectedUsers(selectedUser);
    }
  };
  return (
    <ul className="user-selector-list">
      {users &&
        users.map((user) => {
          return (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              className={`user-selector-list-item ${
                isMultipleSelection && checkIfUserSelected(user) && "selected"
              }`}
            >
              <User {...user} />
            </li>
          );
        })}
    </ul>
  );
};
export default UserSelector;
