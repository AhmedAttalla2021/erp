import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/App.styled";
import axios from "axios";
import "antd/dist/antd.css";

//import "antd/dist/antd.less";

const token = `Bearer ${localStorage.getItem("log")}`;
axios.defaults.baseURL = "https://juinior.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:9090/";
axios.defaults.headers.common["authorization"] = token;
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
