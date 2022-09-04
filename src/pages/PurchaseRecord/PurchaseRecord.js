import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Table, TableContainer, Button } from "@mui/material";
import {
  Header,
  LogoDiv,
  CompanyTitle,
  CustomCell,
} from "./purchaseRecord.styled";
//import "./purchaseRecord.styled";
import "./PurchaseRecord.css";
import { TableBody, TableHead, TableRow, Paper, Box } from "@mui/material";

import { FaEdit } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../Components/Search/Search";
import { DatePickerComp } from "../../Components/DatePickerComp/DatePickerComp";
import MainLayout from "../MainLayout/MainLayout";
import { Link } from "react-router-dom";
import { getAllInvoices } from "../../Apis";
//import { DatePickerComp } from "../../Components/DatePicker/DatePickerComp";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("آجل", "Frozen yoghurt", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData(
//     "آجل",
//     "Ice cream sandwich",
//     12,
//     "شركة مدعوم للمنتجات الطبية",
//     1000
//   ),
//   createData("آجل", "Eclair", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData("آجل", "Cupcake", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData("آجل", "Frozen yoghurt", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData(
//     "آجل",
//     "Ice cream sandwich",
//     12,
//     "شركة مدعوم للمنتجات الطبية",
//     1000
//   ),
//   createData("آجل", "Frozen yoghurt", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData(
//     "آجل",
//     "Ice cream sandwich",
//     12,
//     "شركة مدعوم للمنتجات الطبية",
//     1000
//   ),
//   createData("آجل", "Frozen yoghurt", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData(
//     "آجل",
//     "Ice cream sandwich",
//     12,
//     "شركة مدعوم للمنتجات الطبية",
//     1000
//   ),
//   createData("آجل", "Frozen yoghurt", 12, "شركة مدعوم للمنتجات الطبية", 1000),
//   createData(
//     "آجل",
//     "Ice cream sandwich",
//     12,
//     "شركة مدعوم للمنتجات الطبية",
//     1000
//   ),
// ];

export const PurchaseRecord = () => {
  // const [value, setValue] = React.useState(new Date()); //date Picker
  const [invoicesArr, setInvoicesArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredArr2, setFilteredArr2] = useState([]);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  // const [value, setValue] = React.useState(new Date()); //date Picker
  useEffect(() => {
    getInvoices();
  }, []); // get all invoices
  const getInvoices = async () => {
    try {
      let data = await getAllInvoices();
      console.log("invoicedata", data.data);
      const PurchaseArr = data.data.filter(
        (obj) => obj.invoiceType === "PURCHASING"
      );
      setFilteredArr2([...PurchaseArr]);
      setInvoicesArr([...PurchaseArr]);
      setFilteredArr([...PurchaseArr]);
    } catch {
      alert("invoices not found");
    }
  }; // end of getInvoices function

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
    setInvoicesArr([...arr]);
    console.log("arr", arr);
  }; // end of filterByDateFunc function

  useEffect(() => {
    searchFunc();
  }, [searchValue]);
  const searchFunc = () => {
    const arr = filteredArr.filter((ele) =>
      ele.invoiceNumber.toString().startsWith(searchValue)
    );
    setInvoicesArr([...arr]);
  }; // end of searchFunc function
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

  return (
    <MainLayout>
      <div className="PRwrapper">
        <Container className="containerDiv">
          <div className="PRheaderDiv">
            <div className="PRtitleDateDiv">
              <div className="PRtitle">
                <p className="PRtitleTxt">سجل فواتير الشراء</p>
              </div>
              <Search
                placeholder={`ابحث عن رقم الفاتورة`}
                className="search"
                myValue={searchValue}
                myOnChange={searchOnChange}
              />
            </div>

            <div className="datePickerWrapper">
              <div className="datePickerDiv">
                <p
                  style={{ textAlign: "right", fontWeight: "600" }}
                  className="dateTxt"
                >
                  من
                </p>
                <DatePickerComp
                  myValue={dateFrom}
                  myOnChange={dateFromChange}
                />
                <p
                  style={{ textAlign: "right", fontWeight: "600" }}
                  className="dateTxt"
                >
                  إلى
                </p>
                <DatePickerComp myValue={dateTo} myOnChange={dateToChange} />
              </div>
            </div>
          </div>
          {/* </Header> */}

          <TableContainer
            component={Paper}
            style={{ width: "80%", margin: "0em auto" }}
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
                  backgroundColor: "#E8E9DC ",
                  border: "3px double black",
                  fontWeight: "700",
                }}
              >
                <TableRow>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0D9464 ",
                    }}
                    align="center"
                  >
                    الحالة
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0D9464 ",
                    }}
                    align="center"
                  >
                    تفاصيل
                  </CustomCell>

                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0D9464 ",
                    }}
                    align="center"
                  >
                    التاريخ
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0D9464 ",
                    }}
                    align="center"
                  >
                    إسم المورد
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0D9464 ",
                    }}
                    align="center"
                  >
                    رقم الفاتورة
                  </CustomCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoicesArr.length === 0 ? (
                  <TableRow>
                    <CustomCell
                      colSpan={5}
                      style={{ textAlign: "center", fontSize: "24px" }}
                    >
                      لايــــــــــــــــــوجد فواتيـــــــــــــــــــــــر
                    </CustomCell>
                  </TableRow>
                ) : null}
                {invoicesArr.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ border: "3px double black" }}
                    className="PRtableRow"
                  >
                    <CustomCell className="PRtableCell" align="center">
                      {/* {row.name} */}
                      {row.paid == true ? <p>تم السداد</p> : <p>آجل</p>}
                    </CustomCell>
                    <CustomCell className="PRtableCell" align="center">
                      <Link to={`/purchaseInvoice/${row.invoiceNumber}`}>
                        <BsExclamationCircleFill
                          style={{
                            cursor: "pointer",
                            color: "black",
                            opacity: "0.6",
                          }}
                        />
                      </Link>
                    </CustomCell>
                    <CustomCell
                      className="PRtableCell"
                      align="center"
                      style={{ width: "12%" }}
                    >
                      {/* {row.fat} */}
                      {row.invoiceCreationDate.split("T")[0]}
                    </CustomCell>
                    <CustomCell
                      className="PRtableCell"
                      align="center"
                      style={{ width: "20%" }}
                    >
                      {/* {row.carbs} */}
                      {row.externalParty.name}
                    </CustomCell>
                    <CustomCell className="PRtableCell" align="center">
                      {/* {row.protein} */}
                      {row.invoiceNumber}
                    </CustomCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </MainLayout>
  );
};
