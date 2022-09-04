import React, { useState } from "react";
import { SearchDiv } from "./Search.styled";
import { MdSearch } from "react-icons/md";
import "./Search.css";
export const Search = ({ handleChange, placeholder, myValue, myOnChange }) => {
  //  const [placeHolder = useState('')
  return (
    <div style={{ width: "100%" }}>
      <SearchDiv
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <input
          onBlur={handleChange}
          className="inputSearch"
          type="search"
          value={myValue}
          onChange={myOnChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "right",
            border: "none",
            boxShadow: "0px 0px 5px 1px  lightgrey",
          }}
        />

        <div
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid",
            backgroundColor: "#0D9464",
            border: "none",
          }}
        >
          <MdSearch style={{ fontSize: "20px", color: "white" }} />
        </div>
      </SearchDiv>
    </div>
  );
};
