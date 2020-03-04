import React from "react";
import { Link } from "react-router-dom";
const UserItem = ({ user }) => {
  const { login, avatar_url } = user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        style={{ width: "60px" }}
        alt=""
        className="round-img"
      />
      <h3>{login}</h3>
      <Link to={`/user/${login}`} className="btn btn-dard btn-sm my-1">
        More
      </Link>
    </div>
  );
};
export default UserItem;
