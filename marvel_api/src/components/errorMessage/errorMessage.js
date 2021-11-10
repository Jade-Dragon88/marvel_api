import React from "react";
import ErrorImg from "./error.gif";

const ErrorMessage = () => (
  <img
    src={ErrorImg}
    alt="Error"
    style={{
      display: "block",
      width: "250px",
      height: "250px",
      objectFit: "contain",
      margin: "0 auto",
    }}
  />
);

export default ErrorMessage;
