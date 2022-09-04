import { Box } from "@mui/system";
import styled, { css } from "styled-components";
import sideLogo from "../../assets/sidebar logo.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import "./MainLayout.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { RiSafeFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../App";
const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
  position: relative;
`;
const DrawerBtn = styled.div`
  position: fixed;
  right: 5px;
  top: 5px;
  width: 40px;
  height: 40px;
  background: #e6f8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  > svg {
    height: 80%;
    width: 80%;
  }
  @media (min-width: 900px) {
    display: none;
  }
`;
const Header = styled.div`
  height: 100px;
  background: white;
  img {
    width: 100%;
    height: 100%;
  }
`;
const NavBody = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const CustomListItemIcon = styled(ListItemIcon)`
  margin-left: 15px;
`;

const CustomListItemButton = styled(ListItemButton)`
  .MuiListItemText-root {
    color: white;
    text-align: right;

    > span {
      font-size: 14px;
    }
  }
  .MuiListItemIcon-root {
    color: white;
  }
  &.MuiListItemButton-root {
    padding: 10px 0 10px 0;
    margin-bottom: 10px;

    &:not(:last-child) {
      > div:first-child {
        @media (max-width: 400px) {
          padding: 10px 0px;
        }
        padding: 15px;
        display: none;
        position: absolute;
        right: 102%;
        top: 0%;
        background: #181d1c;
        > div {
          white-space: nowrap;
          color: white;
          font-size: 14px;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          justify-content: end;
          align-items: center;
          text-align: right;
          > svg {
            margin-left: 10px;
          }

          &:hover {
            background: #1b4738;
          }
        }
      }
    }
  }

  ${({ $active }) =>
    $active &&
    css`
      &.MuiListItemButton-root {
        background: #1b4738;
        border-left: 5px solid #b3e288;
        position: relative;
        &:not(:last-child) {
          > div:first-child {
            display: block;
          }
        }
      }
    `}
`;

const CustomDrawer = styled(Drawer)`
  > .MuiPaper-root {
    width: 35%;
    right: 0;
    left: auto;
    overflow-y: unset;
    @media (max-width: 400px) {
      width: 170px;
    }
  }
  > .MuiDrawer-paperAnchorLeft {
    background: red;
  }
`;

export default function MainLayout({ children }) {
  const [salesCss, setSalesCss] = useState(false);
  const loginLogout = useContext(loginContext);
  const [sideOpen, setSideOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const txtStyle = {
    fontSize: "20px",
  };
  const activeStyle = {
    fontSize: "20px",
    color: "green",
  };
  let navigate = useNavigate();

  const handleOutBtn = () => {
    // navigate("/dashboard");
    localStorage.clear();
    //isLogged(localStorage.getItem("token"));
    loginLogout(localStorage.getItem("log"));
  };
  useEffect(() => {
    //  console.log("isLoddeg", isLogged);
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setInnerWidth]);

  const handleClickOutSide = () => {
    setActiveItem(0);
  };
  document.addEventListener("click", () => {
    handleClickOutSide();
  });

  document.removeEventListener("click", handleClickOutSide);

  const list = (width) => (
    <Box sx={{ width: width, backgroundColor: "#191D1C" }}>
      <div>
        <Header>
          <img src={sideLogo} />
        </Header>
        <NavBody>
          <List
            sx={{ width: "100%", padding: "20 0 0 0" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <CustomListItemButton
              $active={1 === activeItem}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItem(activeItem == 1 ? 0 : 1);
              }}
            >
              <div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/saleInvoice`);
                    setSalesCss(true);
                  }}
                >
                  فاتورة بيع جديدة
                  <KeyboardDoubleArrowRightIcon />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/salesRecord`);
                    setSalesCss(true);
                  }}
                >
                  سجل الفواتير البيع
                  <KeyboardDoubleArrowRightIcon />
                </div>
              </div>
              <ListItemText
                primary="المبيعات"
                sx={{ fontSize: "20px" }}
                disableTypography
              />

              <CustomListItemIcon>
                <AiOutlineMoneyCollect />
              </CustomListItemIcon>
            </CustomListItemButton>
            <CustomListItemButton
              $active={2 === activeItem}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItem(activeItem == 2 ? 0 : 2);
              }}
            >
              <div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/purchaseInvoice`);
                  }}
                >
                  فاتورة شراء جديدة
                  <KeyboardDoubleArrowRightIcon />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/purchaseRecord`);
                  }}
                >
                  سجل الفواتير الشراء
                  <KeyboardDoubleArrowRightIcon />
                </div>
              </div>

              <ListItemText
                primary="المشتريات"
                sx={{ fontSize: "20px" }}
                disableTypography
              />
              <CustomListItemIcon>
                <BsCurrencyExchange />
              </CustomListItemIcon>
            </CustomListItemButton>
            <CustomListItemButton
              $active={3 === activeItem}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItem(activeItem == 3 ? 0 : 3);
              }}
            >
              <div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/store`);
                  }}
                >
                  المخزن الرئيسي
                  <KeyboardDoubleArrowRightIcon />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/sourceCoding`);
                  }}
                >
                  التكويد
                  <KeyboardDoubleArrowRightIcon />
                </div>
              </div>

              <ListItemText
                primary="المخزن"
                sx={{ fontSize: "20px" }}
                disableTypography
              />
              <CustomListItemIcon>
                <AiFillShop />
              </CustomListItemIcon>
            </CustomListItemButton>
            <CustomListItemButton
              $active={4 === activeItem}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItem(activeItem == 4 ? 0 : 4);
              }}
            >
              <div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(`/treasury`);
                  }}
                >
                  تحصيل
                  <KeyboardDoubleArrowRightIcon />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/payments`);
                  }}
                >
                  مدفوعات
                  <KeyboardDoubleArrowRightIcon />
                </div>
              </div>

              <ListItemText
                primary="الخزنة"
                sx={{ fontSize: "20px" }}
                disableTypography
              />
              <CustomListItemIcon>
                <RiSafeFill />
              </CustomListItemIcon>
            </CustomListItemButton>
            <CustomListItemButton $active={false} onClick={handleOutBtn}>
              <ListItemText
                primary="تسجيل خروج"
                sx={{ fontSize: "20px" }}
                disableTypography
              />
              <CustomListItemIcon>
                <BiLogOut />
              </CustomListItemIcon>
            </CustomListItemButton>
          </List>
        </NavBody>
      </div>
    </Box>
  );

  return (
    <LayoutContainer>
      <DrawerBtn onClick={() => setSideOpen(true)}>
        <KeyboardDoubleArrowLeftIcon />
      </DrawerBtn>
      <Box sx={{ flex: 1, width: "85%", backgroundColor: "#f6f5f5" }}>
        {children}
      </Box>

      {innerWidth > 900 && list("15%")}
      {innerWidth <= 900 && (
        <CustomDrawer
          anchor={"right"}
          open={sideOpen}
          onClose={() => setSideOpen(0)}
          onOpen={() => {}}
        >
          {list("100%")}
        </CustomDrawer>
      )}
    </LayoutContainer>
  );
}
