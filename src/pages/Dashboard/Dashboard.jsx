import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { loginContext } from "../../App";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import styled from "styled-components";
import logo from "../../assets/login logo.png";
import "./Dashboard.css";
const CustomBox = styled(Box)`
  min-height: 100vh;
  background-color: white;
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

  &:nth-child(3) {
    width: 60px;
    height: 60px;
    top: 80%;
    left: 20%;
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
      top: 0%;
      left: 0%;
      transform: rotate(0deg);
    }
    to {
      top: 100%;
      left: 70%;
      transfor0m: rotate(180deg);
    }
  }
`;

const WelcomeDiv = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index: 99;
  padding: 60px 20px;
  color: white;
  h1 {
    font-size: 35px;
  }
  p {
    font-size: 18px;
  }
  @media (max-width: 400px) {
    padding: 60px 5px;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  }
`;

const CustomBoxWrapper = styled(Box)`
  border-top: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  padding: 50px;
  @media (max-width: 900px) {
    padding: 10px;
  }
`;

const CustomCard = styled(Card)`
  min-height: 210px;
`;
const CustomCardHeader = styled.div`
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  color: #0d9464;
  padding: 5px 0 10px 0;
  > p {
    font-weight: bold;
  }
`;

const CardHeaderImg = styled.div`
  padding: 10px 0 0 0;
  display: flex;
  justify-content: center;
  > svg {
    width: 40px;
    height: 25px;
  }
`;

const CustomList = styled.ul`
  width: 50%;
  text-align: right;
  margin: auto;
  list-style: square;
  direction: rtl;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

const CustomListItem = styled.li`
  cursor: pointer;
  color: #535554;
  font-weight: 600;
  transition: all 0.2s ease;
  :hover {
    transform: translatex(-10%);
    background: #0d9464;
    color: white;
    border-radius: 5px;
  }
`;

const CustomBtn = styled(Button)`
  &.MuiButton-root {
    box-shadow: 2px 2px 5px #1b4738 inset;
    width: 60%;
    padding: 8px 20px;
    color: white;
    font-weight: 500;
    font-family: "Tajawal", sans-serif;
    border-radius: 25px;
    border: 1px solid white;
    font-size: 16px;

    &:hover {
      color: #0d9464;
      background-color: white;
      box-shadow: 0px 0px 0px #1b4738;
    }
    @media all and (max-width: 600px) {
      width: 80%;
      font-size: 12px;
      font-weight: 500;
    }
    @media all and (min-width: 600px) and (max-width: 900px) {
      width: 70%;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const CustomSideBar = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 35%;
  background-color: #0d9464;
`;

const DivWrapper = styled.div`
  margin: auto;
  height: 100%;
  padding: 50px;
  @media (max-width: 900px) {
    padding: 50px 0;
  }
`;

export default function Dashboard(props) {
  const loginLogout = useContext(loginContext);
  const navigate = useNavigate();

  //console.log("props", props);
  const handleOutBtn = () => {
    localStorage.clear();
    loginLogout(localStorage.getItem("log"));
  };

  return (
    <>
      <Grid container style={{ position: "relative" }}>
        <CustomBox sx={{ width: "65%", backgroundColor: "#f1f1f1" }}>
          <DivWrapper>
            <CustomBoxWrapper>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <CustomCard>
                    <CustomCardHeader>
                      <CardHeaderImg>
                        <ShoppingBasketIcon />
                      </CardHeaderImg>
                      <p className="dashPagesTitles">المشتريات</p>
                    </CustomCardHeader>
                    <CardContent>
                      <CustomList>
                        <CustomListItem
                          onClick={() => navigate("/purchaseInvoice")}
                        >
                          فاتورة شراء جديــــدة
                        </CustomListItem>
                        <CustomListItem
                          onClick={() => navigate("/purchaseRecord")}
                        >
                          سجل فواتير الشراء
                        </CustomListItem>
                      </CustomList>
                    </CardContent>
                  </CustomCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomCard>
                    <CustomCardHeader>
                      <CardHeaderImg>
                        <InventoryIcon />
                      </CardHeaderImg>
                      <p className="dashPagesTitles">المبيعات</p>
                    </CustomCardHeader>
                    <CardContent>
                      <CustomList>
                        <CustomListItem
                          onClick={() => navigate("/saleInvoice")}
                        >
                          فاتورة بيع جديــــدة
                        </CustomListItem>
                        <CustomListItem
                          onClick={() => navigate("/salesRecord")}
                        >
                          سجل فواتير البيع
                        </CustomListItem>
                      </CustomList>
                    </CardContent>
                  </CustomCard>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomCard>
                    <CustomCardHeader>
                      <CardHeaderImg>
                        <NoEncryptionIcon />
                      </CardHeaderImg>
                      <p className="dashPagesTitles">الخزنة</p>
                    </CustomCardHeader>
                    <CardContent>
                      <CustomList>
                        <CustomListItem onClick={() => navigate("/treasury")}>
                          تحصـــــــيل
                        </CustomListItem>
                        <CustomListItem onClick={() => navigate("/payments")}>
                          مدفوعات
                        </CustomListItem>
                      </CustomList>
                    </CardContent>
                  </CustomCard>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomCard>
                    <CustomCardHeader>
                      <CardHeaderImg>
                        <StoreIcon />
                      </CardHeaderImg>
                      <p className="dashPagesTitles">المخزن</p>
                    </CustomCardHeader>
                    <CardContent>
                      <CustomList>
                        <CustomListItem onClick={() => navigate("/store")}>
                          المخزن الرئيسي
                        </CustomListItem>
                        <CustomListItem
                          onClick={() => navigate("/sourceCoding")}
                        >
                          التـــــــــــــــكويــــــــــــــــــد
                        </CustomListItem>
                      </CustomList>
                    </CardContent>
                  </CustomCard>
                </Grid>
              </Grid>
            </CustomBoxWrapper>
          </DivWrapper>
        </CustomBox>
        <CustomSideBar>
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

            <WelcomeDiv>
              <h1
                style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}
              >
                مرحبا بعودتك
              </h1>
              <p>سنكون معك خطوة بخطوة </p>
              <p>مع ادق التفاصيل</p>
            </WelcomeDiv>
            <div
              style={{
                width: "90%",
                position: "absolute",
                bottom: "20%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <CustomBtn onClick={handleOutBtn}>تسجيل خروج</CustomBtn>
            </div>
          </div>
        </CustomSideBar>
      </Grid>
    </>
  );
}
