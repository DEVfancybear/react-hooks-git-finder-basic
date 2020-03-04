import React, { useState } from "react";

const Search = props => {
  // sử dụng hook là useState để khai báo trạng thái của keyword và set state của keyword
  const [keyword, setKeyword] = useState("");
  const onChange = e => setKeyword(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    console.log(keyword);
    if (keyword === "") {
        props.setAlert('Please enter something', 'light');
    } else {
      props.searchUsers(keyword);
      setKeyword("");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={onChange}
          name="keyword"
          placeholder="Search users..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {props.showClear && (
        <button className="btn btn-light btn-block" onClick={props.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
