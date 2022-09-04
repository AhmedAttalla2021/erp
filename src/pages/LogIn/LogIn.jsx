import { Box, Button, Container, Grid } from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/login logo.png";
import { AuthContext } from "../../Context/AuthContext";
import { message } from "antd";
import { useContext, useState, useEffect } from "react";
import { loginContext } from "../../App";
import Joi from "joi-browser";
import { schema } from "joi-browser";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../Apis";
import "./Login.css";

const CustomBox = styled(Box)`
  height: 100vh;
  background-color: white;
`;
const CustomLabel = styled.label`
  margin-bottom: 12px;
  line-height: 18px;
  font-weight: 500;
  font-size: 22x;
  @media all and (max-width: 600px) {
    font-size: 14px;
  }
`;
const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: #e6f8e8;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const ImageDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 110px;
  transform: translate(-30%, -50%);
  background: white;
  img {
    height: 100%;
  }
`;

const InputControl = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
`;
const ActionDiv = styled.div`
  > button {
    padding: 5px 25px;
    background: #0d9464;
    color: white;
    font-weight: 500;
    font-size: 18px;
    border-radius: 20px;
    &:hover {
      background: #0d9464;
    }
  }
`;

const ShapeDiv = styled.div`
  background: #44a476;
  position: absolute;

  &:first-child {
    width: 80px;
    height: 80px;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    top: 0;
    left: 80%;
    animation: randomMovement1 7s infinite alternate;
  }

  &:nth-child(2) {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    top: 40%;
    left: 20%;
    animation: randomMovement2 7s infinite alternate;
  }

  &:last-child {
    width: 60px;
    height: 60px;
    top: 60%;
    left: 60%;
    animation: randomMovement3 7s infinite alternate;
  }

  @keyframes randomMovement1 {
    from {
      top: 20%;
      left: 70%;
      transform: rotate(0deg);
    }
    to {
      top: 70%;
      left: 10%;
      transform: rotate(180deg);
    }
  }

  @keyframes randomMovement2 {
    from {
      top: 90%;
      left: 10%;
      transform: rotate(0deg);
    }
    to {
      top: 0%;
      left: 90%;
      transform: rotate(180deg);
    }
  }
  @keyframes randomMovement3 {
    from {
      top: -10%;
      left: 0%;
      transform: rotate(0deg);
    }
    to {
      top: 130%;
      left: 70%;
      transfor0m: rotate(180deg);
    }
  }
`;

export default function LogIn(props) {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useContext(AuthContext);
  const loginLogout = useContext(loginContext);

  const handleLogin = async () => {
    let userData = {
      username: userName,
      password: pass,
    };
    // login();
    // localStorage.setItem("log", true);
    // loginLogout(localStorage.getItem("log"));
    try {
      let data = await loginApi(userData);
      localStorage.setItem("log", data.data.data.token);
      loginLogout(localStorage.getItem("log"));
      console.log("data", data);
    } catch (data) {
      if (userName === "" && pass === "") {
        message.error("ادخل اسم المستخدم و الرقم السرى");
      } else if (userName === "" && pass !== "") {
        message.error("ادخل اسم المستخدم");
      } else if (userName !== "" && pass === "") {
        message.error("ادخل الرقم السرى");
      } else {
        message.error("اسم المستخدم او الرقم السرى غير صحيح");
      }
      //alert("there is an error");
      console.log("data", data);

      /*******/

      //   let obj = { email: userName, pass: pass };
      // const res = Joi.validate(obj, schema, { abortEarly: false });
      // if (res.error !== null) {
      //   for (let i = 0; i < res.error.details.length; i++) {
      //     alert(res.error.details[i].message);
      //   }
      //   if ((email === "" && pass === "") || (email === "" && pass !== "")) {
      //     emailRef.current.focus();
      //   }

      //   if (email !== "" && pass === "") {
      //     passRef.current.focus();
      //   }
      //   console.log(res);
      // } else {
      //   console.log("submit");
      // }
      /*******/
    }
  };
  schema = {
    userName: Joi.string()
      .required()
      .error(() => {
        return {
          message: "username shouldn't be empty",
        };
      }),
    pass: Joi.string()
      .required()
      .error(() => {
        return {
          message: "password shouldn't be empty",
        };
      }),
  };

  const userChangeFunc = (e) => {
    setUserName(e.target.value);
  }; // end of userChangeFunc
  const passChangeFunc = (e) => {
    setPass(e.target.value);
  }; // end of passChangeFunc
  return (
    <>
      <Grid container>
        <CustomBox sx={{ width: "80%" }}>
          <Container>
            <div
              style={{
                margin: "auto",
                height: "100%",
                display: "flex",
                paddingTop: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="loginFormBody"
                // style={{
                //   border: "1px solid #857d7d",
                //   padding: "60px 30px",
                //   color: "#0D9464",
                //   position: "relative",
                // }}
              >
                <ImageDiv>
                  {" "}
                  <img src={logo} />
                </ImageDiv>
                <h1
                  className="loginFormTitle"
                  // style={{ fontSize: 32, fontWeight: 500 }}
                >
                  تسجيل الدخول
                </h1>
                <InputControl
                  style={{
                    padding: "30px 0",
                  }}
                >
                  <CustomLabel>اسم المستخدم</CustomLabel>
                  <Input
                    dir="rtl"
                    type={"text"}
                    style={{ padding: "9px", color: "black" }}
                    value={userName}
                    onChange={userChangeFunc}
                  />
                </InputControl>
                <InputControl
                  style={{
                    padding: "0px 0 30px",
                  }}
                >
                  <CustomLabel>الرقم السري</CustomLabel>
                  <Input
                    dir="rtl"
                    type={"password"}
                    style={{ padding: "9px", color: "black" }}
                    value={pass}
                    onChange={passChangeFunc}
                  />
                </InputControl>
                <ActionDiv>
                  <Button
                    onClick={handleLogin}
                    className="loginBtn"
                    // style={{ padding: "0.1em 2.5em" }}
                  >
                    دخول
                  </Button>
                </ActionDiv>
              </div>
            </div>
          </Container>
        </CustomBox>
        <Box sx={{ width: "20%", backgroundColor: "#0D9464" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <ShapeDiv></ShapeDiv>
            <ShapeDiv></ShapeDiv>
            <ShapeDiv></ShapeDiv>
          </div>
        </Box>
      </Grid>
    </>
  );
}
