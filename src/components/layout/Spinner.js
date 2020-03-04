import React, { Fragment } from "react";
import spinner from "./Spinner-1s-200px.gif";
const Spinner = props => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "350px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
