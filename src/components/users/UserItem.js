import React, { Component } from "react";

export default class UserItem extends Component {
  render() {
    const { login, html_url, avatar_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          style={{ width: "60px" }}
          alt=""
          className="round-img"
        />
        <h3>{login}</h3>
        <a href={html_url} className="btn btn-dard btn-sm my-1">
          More
        </a>
      </div>
    );
  }
}
