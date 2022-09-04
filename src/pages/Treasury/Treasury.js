import React from "react";
import { useState, useEffect } from "react";

import { Container, Grid, Table, TableContainer, Button } from "@mui/material";
import { Header, LogoDiv, CompanyTitle, CustomCell } from "./Treasury.styled";
//import "./purchaseRecord.styled";
import "./Treasury.css";
import { TableBody, TableHead, TableRow, Paper, Box } from "@mui/material";
import { message } from "antd";
import { FaEdit } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../Components/Search/Search";
import { DatePickerComp } from "../../Components/DatePickerComp/DatePickerComp";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { getAllInvoices, companyInfo, updateInvoice } from "../../Apis";
import MainLayout from "../MainLayout/MainLayout";
import { Link } from "react-router-dom";
//import { DatePickerComp } from "../../Components/DatePicker/DatePickerComp";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = [];

export const Treasury = () => {
  const [treasuryArr, setTreasuryArr] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dialogData, setDialogData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filteredArr, setFilteredArr] = useState([]);
  const [filteredArr2, setFilteredArr2] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [treasuryBalance, setTreasuryBalance] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    getTreasuryBalance();
  }, []);
  const getTreasuryBalance = async () => {
    let data = await companyInfo();
    //console.log("companyInfo", data.data.totalBalance);
    setTreasuryBalance(data.data.totalBalance);
  }; // end of getTreasuryBalance function

  useEffect(() => {
    getInvoices();
  }, []); // get all invoices

  const getInvoices = async () => {
    try {
      let data = await getAllInvoices();
      console.log("invoicedata", data.data);
      const arr = data.data.filter((obj) => obj.invoiceType === "SELLING");
      setTreasuryArr([...arr]);

      setFilteredArr([...arr]);
      setFilteredArr2([...arr]);
    } catch (e) {
      //  alert("invoices not found");
    }
  }; // end of getInvoices function
  useEffect(() => {
    searchFunc();
  }, [searchValue]);
  const searchFunc = () => {
    const arr = filteredArr.filter((ele) =>
      ele.invoiceNumber.toString().startsWith(searchValue)
    );
    setTreasuryArr([...arr]);
  }; // end of searchFunc function
  useEffect(() => {
    if (dateFrom !== null && dateTo !== null) {
      filterByDateFunc();
    } else {
      getInvoices();
    }
  }, [dateFrom, dateTo]);
  const filterByDateFunc = () => {
    const arr = filteredArr2.filter(
      (ele) =>
        new Date(ele.invoiceCreationDate) >= new Date(dateFrom) &&
        new Date(ele.invoiceCreationDate) <= new Date(dateTo)
    );
    setFilteredArr([...arr]);
    setTreasuryArr([...arr]);
    console.log("arr", arr);
  }; // end of filterByDateFunc function
  const handleClickOpen = (rowData) => {
    const tmp = rowData;
    console.log("tmp", tmp);
    tmp.totalAmount = Number(tmp.totalAmount).toFixed(3);
    tmp.remainingAmount = Number(tmp.remainingAmount).toFixed(3);
    tmp.paidAmount = Number(tmp.paidAmount).toFixed(3);
    console.log(tmp);
    setDialogData(tmp);
    setOpen(true);
  }; // end of handleClickOpen function
  const handleCloseCodeItemModal = () => {
    setBalanceValue(0);
    setOpen(false);
  }; //end of handleCloseCodeItemModal function
  const handleUpdateInvoiceFunc = async () => {
    setOpenConfirmModal(true);
    // dialogData.paidAmount = balanceValue;
    // let obj = {
    //   id: dialogData.id,
    //   invoiceNumber: dialogData.invoiceNumber,
    //   invoiceCreationDate: dialogData.invoiceCreationDate,
    //   invoiceType: dialogData.invoiceType,
    //   totalAmount: dialogData.totalAmount,
    //   paid: dialogData.paid,
    //   paidAmount: dialogData.paidAmount,
    //   termsAndConditions: null,
    //   externalParty: null,
    //   prodcuts: null,
    // };
    // console.log("dialogDataconfirm", dialogData);
    // let data = await updateInvoice(obj);
    // console.log("invoiceupdated", data);
    // setOpen(false);
    // setBalanceValue(0);
    // getInvoices();
  }; // end of handleUpdateInvoiceFunc
  const searchOnChange = (e) => {
    setSearchValue(e.target.value);
    console.log("e.target.value", e.target.value);
  }; // end of searchOnChange function
  const dateFromChange = (e) => {
    if (e !== null) {
      console.log("dateFrom", e.toLocaleDateString());
      setDateFrom(e.toLocaleDateString());
    } else {
      setDateFrom(null);
    }
  }; // end of dateFromChange function
  const dateToChange = (e) => {
    if (e !== null) {
      console.log("dateTo", e);
      setDateTo(e.toLocaleDateString());
    } else {
      setDateTo(null);
    }
  }; // end of dateToChange function
  const changeBalanceFunc = (e) => {
    if (
      parseInt(e.target.value) > parseInt(dialogData.remainingAmount) ||
      parseInt(e.target.value) < 0
    ) {
      e.preventDefault();
      //message.success({ content: "aaaa", style: "z-index: 5" });
      message.warning(
        "قيمة الرصيد لا يجب ان تكون اكبر من الرصيد المتبقى او اقل من 0"
      );
    } else {
      setBalanceValue(e.target.value);
      // dialogData.paidAmount = e.target.value;
      console.log("dialogData", dialogData);
    }
  }; //end of changeBalanceFunc function
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  }; // end of handleCloseConfrimModal function
  const handleConfirmModal = async () => {
    try {
      dialogData.paidAmount = balanceValue;
      let obj = {
        id: dialogData.id,
        invoiceNumber: dialogData.invoiceNumber,
        invoiceCreationDate: dialogData.invoiceCreationDate,
        invoiceType: dialogData.invoiceType,
        totalAmount: dialogData.totalAmount,
        paid: dialogData.paid,
        paidAmount: dialogData.paidAmount,
        termsAndConditions: null,
        externalParty: null,
        prodcuts: null,
      };
      console.log("dialogDataconfirm", dialogData);
      let data = await updateInvoice(obj);
      console.log("invoiceupdated", data);
      setOpen(false);
      setBalanceValue(0);
      getInvoices();

      setOpen(false);
      message.success("تم التحصيل بنجاح");
    } catch {
      message.error("لم يتم التحصيل");
    }
    setOpenConfirmModal(false);
  }; // end of handleConfirmModal function
  return (
    <MainLayout>
      <div
        style={{
          width: "100%",

          backgroundColor: "#f6f5f5",
          padding: "30px",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: 10,
          }}
        >
          <div className="TRtitleDateDiv">
            <div className="TRbalance">
              <p className="TRbalanceTxt">رصيد الخزنة</p>
              {/* {treasuryBalance ? ( */}
              <div className="TRbalanceValue">{treasuryBalance}</div>
              {/* ) : null} */}
            </div>
            <div className="TRtitle" style={{ marginLeft: "0" }}>
              <p className="TRtitleTxt">التحصيل</p>
            </div>
            <div className="TRdatePickerDiv">
              <p className="TRdateTxt">من</p>
              <DatePickerComp myValue={dateFrom} myOnChange={dateFromChange} />
              <p className="TRdateTxt">إلى</p>
              <DatePickerComp myValue={dateTo} myOnChange={dateToChange} />
            </div>
          </div>
          {/* <Header style={{ display: "flex", justifyContent: "center" }}> */}
          {/* <CompanyTitle> */}
          <div className="TRsearchDiv">
            <Search
              placeholder={`ابحث عن رقم الفاتورة`}
              myValue={searchValue}
              myOnChange={searchOnChange}
            />
          </div>
          {/* </CompanyTitle> */}
          {/* </Header> */}

          <TableContainer
            component={Paper}
            style={{ width: "100%", margin: "2em auto" }}
            sx={{ height: 400 }}
          >
            <Table
              sx={{
                minWidth: 650,
                border: "3px double black",
                height: "max-content",
              }}
              aria-label="simple table"
            >
              <TableHead
                style={{
                  backgroundColor: "#0D9464",
                  border: "3px double black",
                  fontWeight: "700",
                }}
              >
                <TableRow>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "white",
                      color: "white",
                    }}
                    align="center"
                  >
                    التحصيل
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    الحالة
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    تفاصيل
                  </CustomCell>

                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    التاريخ
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    إسم العميل
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    رقم الفاتورة
                  </CustomCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treasuryArr.length === 0 ? (
                  <TableRow>
                    <CustomCell
                      colSpan={6}
                      style={{ textAlign: "center", fontSize: "24px" }}
                    >
                      لايــــــــــــــــــوجد فواتيـــــــــــــــــــــــر
                    </CustomCell>
                  </TableRow>
                ) : null}
                {treasuryArr.map((row) => (
                  <TableRow
                    key={row.invoiceNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ border: "3px double black" }}
                  >
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "10%",
                        color: "black",
                        opacity: "0.6",
                      }}
                      align="center"
                    >
                      {row.paid == false ? (
                        <FaRegMoneyBillAlt
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickOpen(row)}
                        />
                      ) : null}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "10%",
                        color: "#1B4738",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.paid == true ? <p>تم السداد</p> : <p>آجل</p>}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "10%",
                        color: "black",
                        opacity: "0.6",
                      }}
                      align="center"
                    >
                      <Link to={`/saleInvoice/${row.invoiceNumber}`}>
                        <BsExclamationCircleFill
                          style={{ cursor: "pointer", color: "gray" }}
                          // onClick={handleClickOpenDetails}
                        />
                      </Link>
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "15%",
                        color: "#1B4738",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.invoiceCreationDate.split("T")[0]}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "15%",
                        color: "#1B4738",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.externalParty.name}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "10%",
                        color: "#1B4738",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.invoiceNumber}
                    </CustomCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      {/***** collection modal *****/}
      <Dialog open={open} onClose={handleCloseCodeItemModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "700", fontSize: "large" }}
        >
          <p style={{ marginRight: "0.7em" }}> التحصيل </p>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2em",
              }}
            >
              <div
                style={{
                  width: "65%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <p
                  style={{ fontSize: "medium", fontWeight: "600" }}
                >{`رقم الفاتورة : ${dialogData.invoiceNumber}`}</p>
              </div>
              <div
                style={{
                  width: "35%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  رصيد الفاتورة
                </p>
                <div
                  style={{
                    width: "60%",
                    // marginLeft: "3em",
                    border: "none",
                    padding: "0.75em",
                    boxShadow: "0px 2px 2px lightgrey",
                    marginTop: "0.5em",
                    textAlign: "center",
                  }}
                >
                  <p>{dialogData.totalAmount}</p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div>{`الرصيد المتبقى     :         لايوجد`}</div> */}
              <div style={{ display: "flex", width: "100%" }}>
                <section style={{ width: "50%", textAlign: "center" }}>
                  <p
                    className="TRModalPara"
                    // style={{
                    //   fontSize: "medium",
                    //   fontWeight: "500",
                    //   opacity: "0.8",
                    // }}
                  >
                    {dialogData.remainingAmount || `لا يوجد`}
                  </p>
                </section>
                <section style={{ width: "50%" }}>
                  <p
                    className="TRModalPara"
                    // style={{
                    //   fontSize: "medium",
                    //   fontWeight: "500",
                    //   opacity: "0.8",
                    // }}
                  >{`:  الرصـــــيد المــــــتبقى`}</p>
                </section>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                {/* <p>{`الرصيد تم تخليصه    :           170`}</p> */}
                <section style={{ width: "50%", textAlign: "center" }}>
                  <p
                    className="TRModalPara"
                    // style={{
                    //   fontSize: "medium",
                    //   fontWeight: "500",
                    //   opacity: "0.8",
                    // }}
                  >
                    {dialogData.paidAmount}
                  </p>
                </section>
                <section style={{ width: "50%" }}>
                  <p
                    className="TRModalPara"
                    // style={{
                    //   fontSize: "medium",
                    //   fontWeight: "500",
                    //   opacity: "0.8",
                    // }}
                  >{`: الرصيد تم تحصيله  `}</p>
                </section>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                {/* <p>{`قيمة الرصيد       :           100`}</p> */}
                <section style={{ width: "50%", textAlign: "center" }}>
                  <input
                    type="number"
                    style={{
                      width: "50%",
                      border: "none",
                      boxShadow: "0px  0px 2px 2px lightgray",
                      textAlign: "center",
                    }}
                    min={0}
                    max={dialogData.remainingAmount}
                    value={balanceValue}
                    onChange={changeBalanceFunc}
                  />
                </section>
                <section style={{ width: "50%" }}>
                  <p
                    className="TRModalPara"
                    // style={{
                    //   fontSize: "medium",
                    //   fontWeight: "500",
                    //   opacity: "0.8",
                    // }}
                  >{`:  قــــيمة الرصــــــــــــــــيد  `}</p>
                </section>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ marginLeft: "1em" }}>
          <Button onClick={handleCloseCodeItemModal}>إلغاء</Button>
          <Button
            onClick={handleUpdateInvoiceFunc}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
      {/****** confirm modal ******/}
      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}> هل تريد تأكيد التحصيل ؟</p>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseConfirmModal}>إلغاء</Button>
          <Button
            onClick={handleConfirmModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};
