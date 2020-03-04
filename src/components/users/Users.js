import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user, index) => {
          return <UserItem key={index} user={user} />;
        })}
      </div>
    );
  }
};
// style
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGrap: "1rem"
};
export default Users;
