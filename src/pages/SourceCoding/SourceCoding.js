import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Container, Grid, Table, TableContainer, Button } from "@mui/material";
import {
  Header,
  LogoDiv,
  CompanyTitle,
  CustomCell,
  SearchDiv,
  searchInput,
  formInputsDiv,
} from "./SourceCoding.styled";
import "./SourceCoding.css";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { FaEdit } from "react-icons/fa";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  clientSupplierCode,
  searchByName,
  searchByCode,
  getAllClientsSuppliers,
  updateClientSupplier,
  getClientSupplierNextCode,
  searchExternalParty,
} from "../../Apis";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../Components/Search/Search";
import MainLayout from "../MainLayout/MainLayout";

function createData(name, code) {
  return { name, code };
}

const rows = [
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
  createData("شركة مدعوم للمنتجات الطبية", 3000),
];

export const SourceCoding = () => {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openUpdateSupplier, setOpenUpdateSupplier] = useState(false);
  const [openClientModal, setOpenClientModal] = React.useState(false);
  const [clientName, setClientName] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [clientsSuppArr, setClientsSuppArr] = useState([]);
  const [clientsArr, setClientsArr] = useState([]);
  const [supplieresArr, setSupplieresArr] = useState([]);
  const [toggle, setToggle] = useState(true);

  const [fakeArr, setFakeArr] = useState([]);

  /**** update client and supplier ****/
  const [clientIdUpdate, setClientIdUpdate] = useState("");
  const [clientCodeUpdate, setClientCodeUpdate] = useState("");
  const [clientNameUpdate, setClientNameUpdate] = useState("");
  const [isClient, setIsClient] = useState("");
  const [supplierIdUpdate, setSupplierIdUpdate] = useState("");
  const [supplierCodeUpdate, setSupplierCodeUpdate] = useState("");
  const [supplierNameUpdate, setSupplierNameUpdate] = useState("");
  const [isSupplier, setIsSupplier] = useState("");
  const [supClient, setSupClient] = useState("");

  /*****/

  useEffect(() => {
    getAll();
  }, [toggle]);
  const getAll = async () => {
    let data = await getAllClientsSuppliers();
    let clients = data.data.filter((ele) => ele.client === true);
    setClientsArr([...clients]);
    let supplieres = data.data.filter((ele) => ele.client === false);
    setSupplieresArr([...supplieres]);
    console.log("data", data.data);
    //setClientsSuppArr(data.data);
  }; // end of get all func

  const getValueBySearch = async () => {
    // let data;
    let data = await searchExternalParty(searchValue);
    let clients = await data.data.filter((ele) => ele.client === true);
    setClientsArr([...clients]);
    let supplieres = await data.data.filter((ele) => ele.client === false);
    setSupplieresArr([...supplieres]);

    // if (searchValue === "") {
    //   getAll();
    //   console.log("here");
    // } else if (isNaN(parseInt(searchValue))) {
    //   let data = await searchByName(searchValue);
    //   console.log("searchdata", data.data);
    //   //setClientsSuppArr(data.data);
    //   let clients = await data.data.filter((ele) => ele.client === true);
    //   setClientsArr([...clients]);
    //   let supplieres = await data.data.filter((ele) => ele.client === false);
    //   setSupplieresArr([...supplieres]);
    // } else {
    //   console.log(typeof searchValue);
    //   let data = await searchByCode(parseInt(searchValue));
    //   console.log("searchdata", data.data);
    //   // setClientsSuppArr([data.data]);
    //   //let clients = await data.data.filter((ele) => ele.client === true);
    //   //let obj = data.data;
    //   if (data.data.client === true) {
    //     let cArr = [{ ...data.data }];
    //     setClientsArr([...cArr]);
    //     setSupplieresArr([]);
    //     //clientsArr.push(obj);
    //   } else {
    //     //let sArr = [obj];
    //     setSupplieresArr([{ ...data.data }]);
    //     setClientsArr([]);
    //     // supplieresArr.push(obj);
    //   }
    //   // setClientsArr([...clients]);
    //   //let supplieres = await data.data.filter((ele) => ele.client === false);
    //   //setSupplieresArr([...supplieres]);
    // }
  };
  useEffect(() => {
    getValueBySearch();
  }, [searchValue]);

  const getClientSuppNextCode = async () => {
    let data = await getClientSupplierNextCode(supClient);
    console.log("nextCode", data.data);
    setSupplierCode(data.data);
    setClientCode(data.data);
  };
  useEffect(() => {
    getClientSuppNextCode();
  }, [open, openClientModal]); // get client - supplieres code

  const handleClickOpen = () => {
    setSupClient(false);
    setOpen(true);
    setSupplierName("");
  }; // end of handleClickOpen function
  const handleClickOpenClient = () => {
    setSupClient(true);
    setOpenClientModal(true);
    setClientName("");
  }; // end of handleClickOpenClientModal function
  const handleClickOpenUpdate = (row) => {
    setOpenUpdate(true);
    console.log("row", row);
    setClientCodeUpdate(row.code);
    setClientNameUpdate(row.name);
    setClientIdUpdate(row.id);
    setIsClient(row.client);
  }; // end of handleClickOpenUpdate function
  const handleClickOpenUpdateSupplier = (row) => {
    setOpenUpdateSupplier(true);
    console.log("row", row);
    setSupplierCodeUpdate(row.code);
    setSupplierNameUpdate(row.name);
    setSupplierIdUpdate(row.id);
    setIsSupplier(row.client);
  }; // end of handleClickOpenUpdate function
  const handleCloseCodeItemModal = () => {
    setOpen(false);
  }; //end of handleCloseCodeItemModal function
  const handleCodeSupplierModal = async () => {
    let supplier = {
      code: supplierCode,
      name: supplierName,
      client: false,
    };
    try {
      let data = await clientSupplierCode(supplier);
      message.success("تم تكويد المورد بنجاح");
      console.log("data", data);
    } catch {
      //alert("supplier is not coded");
      message.error("لم يتم تكويد المورد");
    }
    setOpen(false);
    setToggle(!toggle);
  }; //end of handleCodeSupplierModal function
  const handleCloseClientCodingModal = () => {
    setOpenClientModal(false);
  }; //end of handleCloseCodeItemModal function
  const handleCodeClientModal = async () => {
    let client = {
      code: clientCode,
      name: clientName,
      client: true,
    };
    try {
      let data = await clientSupplierCode(client);
      console.log("data", data);
      message.success("تم تكويد العميل بنجاح");
    } catch (error) {
      console.log("error", error);
      //alert("client is not coded");
      message.error("لم يتم تكويد العميل");
    }
    setOpenClientModal(false);
    setToggle(!toggle);
  }; //end of handleCodeClientModal function
  const handleCloseUpdateItemModal = () => {
    setOpenUpdate(false);
  }; // end of handleCloseUpdateItemModal function
  const handleConfirmUpdateClientModal = async () => {
    let obj = {
      id: clientIdUpdate,
      code: clientCodeUpdate,
      name: clientNameUpdate,
      client: isClient,
    };
    try {
      let data = await updateClientSupplier(obj);
      console.log("updateClient", data);
      getAll();
      message.success("تم تعديل العميل بنجاح");
    } catch {
      alert("client not updated");
      message.error("لم يتم تعديل العميل");
    }
    setOpenUpdate(false);
  }; // end of handleConfirmUpdateClientModal function
  const handleCloseUpdateSupplierModal = () => {
    setOpenUpdateSupplier(false);
  }; // end of handleCloseUpdateSupplierModal function
  const handleConfirmUpdateSupplierModal = async () => {
    let obj = {
      id: supplierIdUpdate,
      code: supplierCodeUpdate,
      name: supplierNameUpdate,
      client: isSupplier,
    };
    try {
      let data = await updateClientSupplier(obj);
      console.log("updateSupplier", data);
      getAll();
      message.success("تم تعديل المورد بنجاح");
    } catch {
      alert("supplier not updated");
      message.error("لم يتم تعديل المورد");
    }
    setOpenUpdateSupplier(false);
  }; // end of handleConfirmUpdateSupplierModal function

  const changeSuppCodeFunc = (e) => {
    setSupplierCode(e.target.value);
  }; // end of changeSuppCodeFunc
  const changeSuppNameFunc = (e) => {
    setSupplierName(e.target.value);
  }; // end of changeSuppNameFunc
  const changeClietNameFunc = (e) => {
    setClientName(e.target.value);
  }; // end of changeClietNameFunc
  const changeClietCodeFunc = (e) => {
    setClientCode(e.target.value);
  }; // end of changeClietCodeFunc
  return (
    <MainLayout>
      <div
        style={{
          width: "100%",
          // height: "100vh",
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
          {/* <Header
            style={{
              width: "70%",
              margin: "auto",
              justifyContent: "space-between",
            }}
          > */}
          <div className="sourceCodingHeader">
            <div className="codingBtnsDiv">
              <div className="sourceLogoDiv" onClick={handleClickOpen}>
                <IoMdAddCircle className="sourceCodingSvg" />
                <p className="sourceCodingBtnPara">تكويد مورد</p>
              </div>
              <div className="sourceLogoDiv" onClick={handleClickOpenClient}>
                <IoMdAddCircle className="sourceCodingSvg" />
                <p className="sourceCodingBtnPara">تكويد عميل</p>
              </div>
            </div>
            {/* </LogoDiv> */}
            {/* <CompanyTitle> */}
            {/* <h2>شركة المجد للتجارة وتوزيع المنتجات</h2>
        <p>الرقم الضريبي 0123456789</p> */}
            <div className="sourceSearch">
              <Search
                placeholder={`ابحث عن المورد/العميل`}
                myValue={searchValue}
                myOnChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {/* </CompanyTitle> */}
            {/* </Header> */}
          </div>
          <div
            className="tablesDiv"
            style={{ display: "flex", width: "90%", margin: "auto" }}
          >
            <TableContainer
              component={Paper}
              style={{ width: "70%", margin: "2em auto", marginRight: "0.5em" }}
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
                      تعديل
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#E8E9DC ",
                        color: "white",
                      }}
                      align="center"
                    >
                      الكود
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#E8E9DC ",
                        color: "white",
                      }}
                      align="center"
                    >
                      المورد
                    </CustomCell>
                    {/* <CustomCell
                    style={{
                      border: "3px double black",
                      color: "white",
                      color: "white",
                    }}
                    align="center"
                  >
                    تعديل
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    الكود
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    المورد
                  </CustomCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplieresArr.length === 0 ? (
                    <TableRow>
                      <CustomCell
                        colSpan={3}
                        style={{ textAlign: "center", fontSize: "24px" }}
                      >
                        لايــــــــــــــــــوجد مـــــــــــــــــوردين
                      </CustomCell>
                    </TableRow>
                  ) : null}
                  {supplieresArr.map(
                    (row) => (
                      //  row.client === true ? (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          <FaEdit
                            style={{ cursor: "pointer" }}
                            // onClick={() => handleClickOpenUpdate(row)}
                            onClick={() => handleClickOpenUpdateSupplier(row)}
                          />
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
                          {row.code}
                        </CustomCell>
                        <CustomCell
                          style={{
                            border: "3px double black",
                            width: "30%",
                            color: "#1B4738",
                            fontWeight: "500",
                          }}
                          align="center"
                        >
                          {row.name}
                        </CustomCell>
                        {/* <CustomCell
                        style={{
                          border: "3px double black",
                          width: "10%",
                          color: "black",
                          opacity: "0.6",
                        }}
                        align="center"
                      >
                       
                      </CustomCell>
                      <CustomCell
                        style={{
                          border: "3px double black",
                          width: "10%",
                          color: "#1B4738",
                          fontWeight: "500",
                        }}
                        align="center"
                      ></CustomCell>
                      <CustomCell
                        style={{
                          border: "3px double black",
                          width: "30%",
                          color: "#1B4738",
                          fontWeight: "500",
                        }}
                        align="center"
                      ></CustomCell> */}
                      </TableRow>
                    )
                    //   ) : (
                    // <TableRow
                    //   //key={row.name}
                    //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    //   style={{ border: "3px double black" }}
                    // >
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "black",
                    //       opacity: "0.6",
                    //     }}
                    //     align="center"
                    //   >

                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   ></CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "30%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   ></CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "black",
                    //       opacity: "0.6",
                    //     }}
                    //     align="center"
                    //   >
                    //     <FaEdit
                    //       style={{ cursor: "pointer" }}
                    //       onClick={() => handleClickOpenUpdateSupplier(row)}
                    //     />
                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   >
                    //     {row.code}
                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "30%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   >
                    //     {row.name}
                    //   </CustomCell>
                    // </TableRow>
                    //  )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer
              component={Paper}
              style={{ width: "70%", margin: "2em auto", marginLeft: "0.5em" }}
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
                      تعديل
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#E8E9DC ",
                        color: "white",
                      }}
                      align="center"
                    >
                      الكود
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#E8E9DC ",
                        color: "white",
                      }}
                      align="center"
                    >
                      العميل
                    </CustomCell>
                    {/* <CustomCell
                    style={{
                      border: "3px double black",
                      color: "white",
                      color: "white",
                    }}
                    align="center"
                  >
                    تعديل
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    الكود
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    المورد
                  </CustomCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientsArr.length === 0 ? (
                    <TableRow>
                      <CustomCell
                        colSpan={3}
                        style={{ textAlign: "center", fontSize: "24px" }}
                      >
                        لايــــــــــــــــــوجد عمـــــــــــــــــــــــــلاء
                      </CustomCell>
                    </TableRow>
                  ) : null}
                  {clientsArr.map(
                    (row) => (
                      //  row.client === true ? (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          <FaEdit
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClickOpenUpdate(row)}
                          />
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
                          {row.code}
                        </CustomCell>
                        <CustomCell
                          style={{
                            border: "3px double black",
                            width: "30%",
                            color: "#1B4738",
                            fontWeight: "500",
                          }}
                          align="center"
                        >
                          {row.name}
                        </CustomCell>
                        {/* <CustomCell
                        style={{
                          border: "3px double black",
                          width: "10%",
                          color: "black",
                          opacity: "0.6",
                        }}
                        align="center"
                      >
                       
                      </CustomCell>
                      <CustomCell
                        style={{
                          border: "3px double black",
                          width: "10%",
                          color: "#1B4738",
                          fontWeight: "500",
                        }}
                        align="center"
                      ></CustomCell>
                      <CustomCell
                        style={{
                          border: "3px double black",
                          width: "30%",
                          color: "#1B4738",
                          fontWeight: "500",
                        }}
                        align="center"
                      ></CustomCell> */}
                      </TableRow>
                    )
                    //   ) : (
                    // <TableRow
                    //   //key={row.name}
                    //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    //   style={{ border: "3px double black" }}
                    // >
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "black",
                    //       opacity: "0.6",
                    //     }}
                    //     align="center"
                    //   >

                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   ></CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "30%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   ></CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "black",
                    //       opacity: "0.6",
                    //     }}
                    //     align="center"
                    //   >
                    //     <FaEdit
                    //       style={{ cursor: "pointer" }}
                    //       onClick={() => handleClickOpenUpdateSupplier(row)}
                    //     />
                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "10%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   >
                    //     {row.code}
                    //   </CustomCell>
                    //   <CustomCell
                    //     style={{
                    //       border: "3px double black",
                    //       width: "30%",
                    //       color: "#1B4738",
                    //       fontWeight: "500",
                    //     }}
                    //     align="center"
                    //   >
                    //     {row.name}
                    //   </CustomCell>
                    // </TableRow>
                    //  )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </div>
      {/*** source coding modal***/}
      <Dialog open={open} onClose={handleCloseCodeItemModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}>تكويد مورد جديد</p>
        </DialogTitle>
        <DialogContent>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={supplierCode}
              onChange={changeSuppCodeFunc}
              readOnly={true}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              كــــود المورد{" "}
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={supplierName}
              onChange={changeSuppNameFunc}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              إسم المورد
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCodeItemModal}>إلغاء</Button>
          <Button
            onClick={handleCodeSupplierModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/**  client coding modal **/}
      <Dialog open={openClientModal} onClose={handleCloseClientCodingModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}>تكويد عميل جديد</p>
        </DialogTitle>
        <DialogContent>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={clientCode}
              onChange={changeClietCodeFunc}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              كــــود العميل{" "}
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={clientName}
              onChange={changeClietNameFunc}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              إسم العميل
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClientCodingModal}>إلغاء</Button>
          <Button
            onClick={handleCodeClientModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/*** update client modal***/}
      <Dialog open={openUpdate} onClose={handleCloseUpdateItemModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}> تعديل العميل</p>
        </DialogTitle>
        <DialogContent>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={clientCodeUpdate}
              onChange={(e) => setClientCodeUpdate(e.target.value)}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              كـــود العميل{" "}
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={clientNameUpdate}
              onChange={(e) => setClientNameUpdate(e.target.value)}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              إسم العميل
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateItemModal}>إلغاء</Button>
          <Button
            onClick={handleConfirmUpdateClientModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/*** update supplier modal***/}
      <Dialog
        open={openUpdateSupplier}
        onClose={handleCloseUpdateSupplierModal}
      >
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}> تعديل المورد</p>
        </DialogTitle>
        <DialogContent>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={supplierCodeUpdate}
              onChange={(e) => setSupplierCodeUpdate(e.target.value)}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              كـــود المورد{" "}
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={supplierNameUpdate}
              onChange={(e) => setSupplierNameUpdate(e.target.value)}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                width: "30%",
                fontWeight: "500",
              }}
              className="formTypography"
            >
              إسم المورد
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateSupplierModal}>إلغاء</Button>
          <Button
            onClick={handleConfirmUpdateSupplierModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};
