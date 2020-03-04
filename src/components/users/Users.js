import React, { Component } from "react";
import UserItem from "./UserItem";
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 108762,
          login: "tokuda109",
          html_url: "https://github.com/tokuda109",
          avatar_url: "https://avatars3.githubusercontent.com/u/108762?v=4"
        },
        {
          login: "svallory",
          id: 117560,
          avatar_url: "https://avatars1.githubusercontent.com/u/117560?v=4",
          html_url: "https://github.com/svallory"
        }
      ]
    };
  }
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user, index) => {
          return <UserItem key={index} user={user} />;
        })}
      </div>
    );
  }
}
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGrap: "1rem"
};
