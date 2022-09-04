import { useState, useEffect, useRef } from "react";
import CancelSharp from "@mui/icons-material/CancelSharp";
import ReactToPrint from "react-to-print";
import { message } from "antd";
import {
  Container,
  Grid,
  Table,
  TableContainer,
  Button,
  TableCell,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import {
  Header,
  LogoDiv,
  CompanyTitle,
  CustomTableHead,
  CustomTableBody,
  InfoCell,
  AddIconRow,
  CommercialDiv,
  CustomerName,
  CustomCell,
  DivWrapper,
} from "../Invoice.styled";
import mainLogo from "../../assets/mainLogo.png";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MainLayout from "../MainLayout/MainLayout";
import { useParams } from "react-router-dom";
import {
  companyInfo,
  getAllClientsSuppliers,
  searchByCode,
  getInvoiceNumber,
  calcProductTotalPricePur,
  searchProductByCode,
  createInvoice,
  getAllInvoices,
} from "../../Apis";
import "./PurchaseInvoice.css";
import { FaLastfmSquare } from "react-icons/fa";
// function createData(name, calories, discount, fat, carbs, protein, disc) {
//   return { name, calories, discount, fat, carbs, protein, disc };
// }

export default function PurchaseInvoice() {
  const [companyName, setCompanyName] = useState("");
  const [commercialNum, setCommercialNum] = useState();
  const [taxNum, setTaxNum] = useState();
  const [vat, setVat] = useState();
  /*** item data ****/
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [disc, setDisc] = useState(0);
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unitTax, setUnitTax] = useState("");
  const [itemTotal, setItemTotal] = useState(0);
  const [unitPurPrice, setUnitPurPrice] = useState("");
  const [itemSellPrice, setItemSellPrice] = useState("");
  const [itemPurPrice, setItemPurPrice] = useState("");
  /************/
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [clientsArr, setClientsArr] = useState([]);
  const [proData, setProData] = useState({});
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [collection, setCollection] = useState(0);
  const [restInvoice, setRestInvoice] = useState(0);
  // const [clientCode, setClientCode] = useState("");
  // const [clientName, setClientName] = useState("");
  // const [supplieresArr, setSupplieresArr] = useState([]);
  // const [quantity, setQuantity] = useState("");
  // const [disc, setDisc] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceToggle, setInvoiceToggle] = useState(true);
  const [normalFlag, setNormalFlag] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const [showCancelRow, setShowCancelRow] = useState(true);
  const { id } = useParams();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState("");
  const myParams = useParams();
  const componentRef = useRef();

  useEffect(() => {
    getInvoices();
  }, [myParams]);
  const getInvoices = async () => {
    if (myParams.id) {
      setShowPlus(false);
      setShowCancelRow(false);
      let data = await getAllInvoices();
      console.log("invoices", data.data);
      let arr = data.data.filter(
        (ele) => ele.invoiceNumber === parseInt(myParams.id)
      );
      let obj = arr[0];
      setClientCode(obj.externalParty.code);
      setInvoiceNumber(obj.invoiceNumber);
      setDate(obj.invoiceCreationDate.split("T")[0]);
      setInvoiceTotal(obj.totalAmount.toFixed(4));
      setCollection(obj.paidAmount);
      setRestInvoice(obj.remainingAmount.toFixed(4));
      setRows([...obj.prodcuts]);
      console.log("obj", obj);
    } else {
      setClientCode("");
      setClientName("");
      setInvoiceToggle(!invoiceToggle);
      setShowPlus(true);
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();
      let theDate = `${yyyy}-${mm}-${dd}`;
      console.log("today", theDate);
      setDate(theDate);
      setInvoiceTotal(0);
      setCollection(0);
      setRestInvoice(0);
      setRows([]);
    }
  }; // end of getInvoices function

  useEffect(() => {
    //getAllSupplieres();
    if (clientCode !== "") {
      getClientName();
    }
  }, [clientCode]);
  const getClientName = async () => {
    let data = await searchByCode(parseInt(clientCode));
    setClientName(data.data.name);
    setClientId(data.data.id);
  }; // end of getClientName function
  useEffect(() => {
    getInvoiceNum();
  }, [invoiceToggle]); // get invoice number

  const getInvoiceNum = async () => {
    let data = await getInvoiceNumber();
    setInvoiceNumber(data.data);
    console.log("invoiceNumber", data.data);
  }; // end of getInvoiceNum function
  useEffect(() => {
    getDate();
  }, []); // get date
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let theDate = `${yyyy}-${mm}-${dd}`;
    console.log("today", theDate);
    setDate(theDate);
  }; // end of get date function

  useEffect(() => {
    if (itemCode !== "") {
      getProductByCode();
    } else {
      setItemName("");
      setUnitPrice("");
      setUnitTax("");
    }
  }, [itemCode]);
  const getProductByCode = async () => {
    let data = await searchProductByCode(itemCode);
    console.log("proData", data.data[0]);
    setItemId(data.data[0].id);
    setItemName(data.data[0].name);
    setUnitPrice(data.data[0].productSellingPrice.toFixed(4));
    setUnitTax(data.data[0].tax);
    setUnitPurPrice(data.data[0].productPurchasingPrice);
    setItemSellPrice(data.data[0].sellingPrice);
    setItemPurPrice(data.data[0].purchasingPrice);
  }; // end of getProductByCode

  useEffect(() => {
    if (disc !== "" && quantity !== "") {
      calculateProTotalPrice();
    }
  }, [disc, quantity]);
  const calculateProTotalPrice = async () => {
    setProData({
      id: itemId,
      code: itemCode,
      name: itemName,
      quantity: quantity,
      productPurchasingPrice: unitPurPrice,
      productSellingPrice: unitPrice,
      purchasingPrice: itemPurPrice,
      sellingPrice: itemSellPrice,
      tax: unitTax,
      discount: disc,
    });
    const obj = {
      // id: itemId,
      code: itemCode,
      name: itemName,
      quantity: quantity,
      productPurchasingPrice: unitPurPrice,
      productSellingPrice: unitPrice,
      purchasingPrice: itemPurPrice,
      sellingPrice: itemSellPrice,
      tax: unitTax,
      discount: disc,
    };
    let data = await calcProductTotalPricePur(obj);
    setItemTotal(data.data.totalPrice.toFixed(4));
    console.log("clacTotalPrice", data.data);

    setProData({
      id: itemId,
      code: itemCode,
      name: itemName,
      quantity: quantity,
      productPurchasingPrice: unitPurPrice,
      productSellingPrice: unitPrice,
      purchasingPrice: itemPurPrice,
      sellingPrice: itemSellPrice,
      discount: disc,
      tax: unitTax,
      totalPrice: data.data.totalPrice,
    });
  }; // end of calculateProTotalPrice function

  useEffect(() => {
    getAllSupplieres();
  }, []);

  const getAllSupplieres = async () => {
    let data = await getAllClientsSuppliers();
    console.log("data", data.data);
    let supplieres = data.data.filter((item) => item.client == FaLastfmSquare);
    setClientsArr(supplieres);
  }; // end of getAllClients function

  // const getAllSupplieres = async () => {
  //   let data = await getAllClientsSuppliers();

  //   let supplieres = data.data.filter((item) => item.client == false);
  //   console.log("data", supplieres);
  //   setSupplieresArr(supplieres);
  // }; // end of getAllClients function

  const tableInputStyle = {
    width: "90%",
    margin: "auto",
    textAlign: "center",
    boxShadow: "0 0 3px gray",
    outline: "none",
  };
  // style={{
  //   width: "90%",
  //   margin: "auto",
  //   textAlign: "center",
  //   boxShadow: "0 0 3px gray",
  // }}

  useEffect(() => {
    if (id) {
      setNormalFlag(true);
      console.log("id", id);
    } else {
      setNormalFlag(false);
    }
  }, [id]);
  useEffect(() => {
    companyInfoData();
  }, []);

  let companyInfoData = async () => {
    let data = await companyInfo();
    setCompanyName(data.data.name);
    setCommercialNum(data.data.commercialRegistryNumber);
    setTaxNum(data.data.taxRegistryNumber);
    setVat(data.data.vat);
  };

  const addNewRow = () => {
    const arrValues = [...rows];
    arrValues.push(proData);

    setRows([...arrValues]);
    console.log("roooooooows", rows);
    /**** */
    setQuantity(0);

    setDisc(0);
    setItemCode("");
    setItemName("");

    setUnitPurPrice(0);
    setUnitTax(0);
    setItemTotal(0);
  }; // end of addNewRow function
  useEffect(() => {
    calcInvoiceTotal();
  }, [rows, itemTotal]); // صافى الفاتورة
  const calcInvoiceTotal = () => {
    let res = 0;
    if (rows.length !== 0) {
      for (let i = 0; i < rows.length; i++) {
        res += rows[i].totalPrice;
      }
      setInvoiceTotal(parseInt(res).toFixed(4));
      setRestInvoice((res - collection).toFixed(4));
    } else {
      setInvoiceTotal(parseInt(itemTotal).toFixed(4));
      if (parseInt(itemTotal) !== 0) {
        setRestInvoice(parseInt(itemTotal - parseInt(collection)).toFixed(4));
      } else {
        setRestInvoice(itemTotal);
      }

      // setRestInvoice(parseInt(itemTotal).toFixed(4));
    }
  }; // end of calcInvoiceTotal function
  const discChangeFunc = (e) => {
    setDisc(e.target.value);
  };
  const quantityChangeFunc = (e) => {
    setQuantity(e.target.value);
  };
  const codeChangeFunc = (e) => {
    setItemCode(e.target.value);
  };
  const changeSupplierCodeFunc = (e) => {
    if (myParams.id) {
      setClientCode(clientCode);
    } else {
      setClientCode(e.target.value);
    }

    if (e.target.value === "") {
      setClientName("");
    }
  }; // end of changeClientCodeFunc
  const collectionChangeFunc = (e) => {
    if (rows.lenght === 0) {
      setInvoiceTotal(itemTotal);
    }
    if (myParams.id) {
      setCollection(collection);
      setRestInvoice(restInvoice);
    } else {
      if (parseInt(e.target.value) > parseInt(invoiceTotal)) {
        e.preventDefault();
        message.warning("قيمة التحصيل لا يجب ان تكون اكبر من صافى الفاتورة");
      } else {
        setCollection(e.target.value);
        setRestInvoice(invoiceTotal - e.target.value);
      }
    }

    //setRestInvoice(invoiceTotal - e.target.value);
  }; // end of collectionChangeFunc
  const confirmSalesInvoice = async () => {
    setOpenConfirmModal(true);
    // try {
    //   if (rows.length !== 0) {
    //     console.log("rows", rows);
    //     let obj = {
    //       invoiceType: "purchasing",
    //       invoiceNumber: invoiceNumber,
    //       invoiceCreationDate: date,
    //       totalAmount: invoiceTotal,
    //       paid: invoiceTotal <= collection ? true : false,
    //       remainingAmount: restInvoice,
    //       paidAmount: collection,
    //       termsAndConditions: "aaaa",
    //       externalParty: {
    //         id: clientId,
    //         code: clientCode,
    //         name: clientName,
    //         client: true,
    //       },
    //       prodcuts: [...rows],
    //     };
    //     let data = await createInvoice(obj);
    //     console.log("invoiceData", data);
    //   } else {
    //     console.log("itemTotal", itemTotal);
    //     console.log("rows", rows);
    //     let arr = [];
    //     let myObj = {
    //       code: itemCode,
    //       name: itemName,
    //       quantity: quantity,
    //       productPurchasingPrice: unitPurPrice,
    //       productSellingPrice: unitPrice,
    //       purchasingPrice: itemPurPrice,
    //       sellingPrice: itemSellPrice,
    //       discount: disc,
    //       tax: unitTax,
    //       totalPrice: itemTotal,
    //     };
    //     arr.push(myObj);
    //     // setInvoiceTotal(itemTotal);
    //     // setRestInvoice(itemTotal - collection);

    //     let objj = {
    //       invoiceType: "purchasing",
    //       invoiceNumber: invoiceNumber,
    //       invoiceCreationDate: date,
    //       totalAmount: invoiceTotal,
    //       paid: true,
    //       remainingAmount: restInvoice,
    //       paidAmount: collection,
    //       termsAndConditions: "aaaa",
    //       externalParty: {
    //         id: clientId,
    //         code: clientCode,
    //         name: clientName,
    //         client: true,
    //       },
    //       prodcuts: [...arr],
    //     };
    //     let data = await createInvoice(objj);
    //     console.log("invoiceData", data);
    //     console.log("rest", restInvoice);
    //     console.log("arr", arr);
    //   }
    //   message.success("Invoice Created Successfully");
    //   setNormalFlag(true);
    //   setShowPlus(false);
    //   setShowCancelRow(false);
    // } catch {
    //   message.error("Invoice Not Created");
    // }
    // // }
    // setInvoiceToggle(!invoiceToggle);
  }; // end of confirmSalesInvoice function

  const cancelInvoiceFunc = () => {
    //setNormalFlag(true);
    setShowPlus(true);
    setShowCancelRow(true);

    rows.length = 0;
    setItemTotal(0);
    setRestInvoice(0);
    setCollection(0);
    setInvoiceTotal(0);
    setClientCode("");
    setClientName("");
    setItemCode("");
    setDisc("");
    setQuantity("");
  }; // end of cancelInvoiceFunc function
  const codeRowChangeFunc = (i) => {
    console.log("i", i);
    // console.log("o", o.target.value);
  };
  const deleteRow = (row) => {
    console.log("row", row);
    const arr = [...rows];
    arr.splice(arr.indexOf(row), 1);
    setRows([...arr]);
    if (arr.length === 0 && parseInt(itemTotal) === 0) {
      setCollection(0);
    }
  }; // end of deleteRow function
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  }; // end of handleCloseConfrimModal function
  const handleConfirmModal = async () => {
    try {
      if (rows.length !== 0) {
        console.log("rows", rows);
        let obj = {
          invoiceType: "purchasing",
          invoiceNumber: invoiceNumber,
          invoiceCreationDate: date,
          totalAmount: invoiceTotal,
          paid: invoiceTotal <= collection ? true : false,
          remainingAmount: restInvoice,
          paidAmount: collection,
          termsAndConditions: "aaaa",
          externalParty: {
            id: clientId,
            code: clientCode,
            name: clientName,
            client: true,
          },
          prodcuts: [...rows],
        };
        let data = await createInvoice(obj);
        console.log("invoiceData", data);
      } else {
        console.log("itemTotal", itemTotal);
        console.log("rows", rows);
        let arr = [];
        let myObj = {
          id: itemId,
          code: itemCode,
          name: itemName,
          quantity: quantity,
          productPurchasingPrice: unitPurPrice,
          productSellingPrice: unitPrice,
          purchasingPrice: itemPurPrice,
          sellingPrice: itemSellPrice,
          discount: disc,
          tax: unitTax,
          totalPrice: itemTotal,
        };
        arr.push(myObj);
        // setInvoiceTotal(itemTotal);
        // setRestInvoice(itemTotal - collection);

        let objj = {
          invoiceType: "purchasing",
          invoiceNumber: invoiceNumber,
          invoiceCreationDate: date,
          totalAmount: invoiceTotal,
          paid: true,
          remainingAmount: restInvoice,
          paidAmount: collection,
          termsAndConditions: "aaaa",
          externalParty: {
            id: clientId,
            code: clientCode,
            name: clientName,
            client: true,
          },
          prodcuts: [...arr],
        };
        let data = await createInvoice(objj);
        console.log("invoiceData", data);
        console.log("rest", restInvoice);
        console.log("arr", arr);
      }
      message.success("تم تأكيد الفاتورة بنجاح");
      setNormalFlag(true);
      setShowPlus(false);
      setShowCancelRow(false);
    } catch {
      message.error("فشل تأكيد الفاتورة");
    }
    // }
    setInvoiceToggle(!invoiceToggle);
    setOpenConfirmModal(false);
  }; // end of handleConfirmModal function
  return (
    <MainLayout>
      <DivWrapper>
        <Container
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: 10,
          }}
        >
          <div className="printDiv" ref={componentRef}>
            <Header className="mainHeader">
              <h2
                style={{
                  fontSize: "28px",
                  fontFamily: "'Tajawal' , sans-serif",
                }}
              >
                {/* شركة المجد للتجارة وتوزيع المنتجات */}
                {companyName}
              </h2>
              <div>
                <LogoDiv>
                  <img src={mainLogo} />
                </LogoDiv>
                <CompanyTitle>
                  <CommercialDiv>
                    {/* <p>ضريبة القيمة المضافة : %12</p>

                  <p>رقم التسجيل الضريبي : 1234598563258756</p>
                  <p>رقم السجل التجاري : 12348759669</p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "16px", fontWeight: "500" }}>
                        %{vat}
                      </p>
                      <p
                        style={{
                          textAlign: "right",
                          marginLeft: "5px",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        : ضريبة القيمة المضافة{" "}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "16px", fontWeight: "500" }}>
                        {taxNum}
                      </p>
                      <p
                        style={{
                          textAlign: "right",
                          marginLeft: "5px",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        : رقم التسجيل الضريبي{" "}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "16px", fontWeight: "500" }}>
                        {commercialNum}
                      </p>
                      <p
                        style={{
                          textAlign: "right",
                          marginLeft: "5px",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        : رقم السجل التجارى{" "}
                      </p>
                    </div>
                  </CommercialDiv>
                </CompanyTitle>
              </div>
            </Header>
            <Grid container style={{ padding: "30px 0" }}>
              <Grid item xs={3}>
                {/* <p style={{ fontWeight: "500" }}> رقم الفاتورة : 21522</p>{" "} */}
                <div
                  className="billNumDiv"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="billNumPara"
                    style={{ fontWeight: "500", marginRight: "0.5em" }}
                  >
                    {invoiceNumber}
                  </p>
                  <p className="billNumTxt" style={{ fontWeight: "600" }}>
                    {" "}
                    : رقم الفاتورة
                  </p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    width: "80%",
                    padding: "5px 0",
                    backgroundColor: "#E6F8E8",
                    borderRadius: 8,
                    margin: "0 auto",
                    boxShadow: "2px 2px 8px rgba(0,0,0,.2)",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}
                  className="invoiceName"
                >
                  فاتورة مشتريات
                </div>
              </Grid>
              <Grid item xs={3}>
                <div
                  className="dateDiv"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="datePara"
                    style={{ fontWeight: "500", marginRight: "0.5em" }}
                  >
                    {date}
                  </p>{" "}
                  <p className="dateTxt" style={{ fontWeight: "600" }}>
                    {" "}
                    : التاريخ
                  </p>
                </div>
                {/* <p style={{ fontWeight: "500" }}> التاريخ : 1-6-2022</p> */}
              </Grid>
              <Grid item xs={12}>
                {/* <CustomerName style={{ marginRight: "4.5em" }}>
                <p style={{ fontWeight: "500" }}>اسم العميل /</p>
                <p style={{ fontWeight: "500", marginLeft: "2em" }}>
                  كريم محمد السيد
                </p>
              </CustomerName> */}
                <div
                  className="clientCodeNameDiv"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",

                    marginTop: "2em",
                    // width: "70%",
                  }}
                >
                  <div
                    className="clientNameDiv"
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                      marginRight: "2em",
                      width: "60%",
                    }}
                  >
                    <div
                      className="clientNamePara"
                      style={{
                        marginRight: "1em",
                        border: "0.5px solid lightgray",
                        padding: "0.25em",
                        boxShadow: "0 0 7px lightgray",
                        width: "70%",
                        height: "2em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E8E9DC",
                        // opacity: "0.7",
                      }}
                    >
                      {/* شركة مدعوم للمنتجات الطبية */}
                      {clientName}
                    </div>
                    <p className="clientNameTxt" style={{ fontWeight: "bold" }}>
                      {" "}
                      إسم المورد{" "}
                    </p>
                  </div>
                  <div
                    className="clientCodeDiv"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "25%",
                    }}
                  >
                    <input
                      className="clientCodePara"
                      type="number"
                      style={{
                        marginRight: "1em",
                        border: "0.5px solid lightgray",
                        outline: "none",
                      }}
                      value={clientCode}
                      onChange={changeSupplierCodeFunc}
                    />
                    <p
                      className="clientCodeTxt"
                      style={{
                        width: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      كود المورد{" "}
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>

            <TableContainer component={Paper} style={{ padding: 40 }}>
              <Table
                sx={{
                  minWidth: 650,
                  border: "3px double black",
                  height: "max-content",
                  position: "relative",
                }}
                aria-label="simple table"
              >
                {showPlus ? (
                  <AddIconRow
                    onClick={addNewRow}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +
                  </AddIconRow>
                ) : null}

                <CustomTableHead>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "900", backgroundColor: "white" }}
                      align="center"
                    >
                      {/* حذف */}
                    </TableCell>
                    <TableCell
                      style={{ border: "3px double black", fontWeight: "900" }}
                      align="center"
                    >
                      الاجمالي
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                      }}
                      align="center"
                    >
                      الضريبة
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                      }}
                      align="center"
                    >
                      قيمة الخصم
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                      }}
                      align="center"
                    >
                      الكمية
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                      }}
                      align="center"
                    >
                      سعر الوحدة
                    </TableCell>
                    {/* <TableCell
                    style={{
                      border: "3px double black",
                      fontWeight: "900",
                    }}
                    align="center"
                  >
                    الوحدة
                  </TableCell> */}
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                      }}
                      align="center"
                    >
                      اسم الصنف
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                        width: "25",
                      }}
                      align="center"
                    >
                      كود الصنف
                    </TableCell>
                  </TableRow>
                </CustomTableHead>
                <CustomTableBody>
                  {!myParams.id ? (
                    <TableRow
                      // key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ fontWeight: "500" }}
                    >
                      {/*******/}
                      <TableCell
                        style={{
                          fontWeight: "900",
                        }}
                        align="center"
                      ></TableCell>
                      {/*******/}
                      <TableCell
                        style={{
                          border: "3px double black",
                          fontWeight: "900",
                        }}
                        align="center"
                      >
                        {itemTotal}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {unitTax}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                          fontWeight: "900",
                        }}
                        align="center"
                      >
                        <input
                          type="number"
                          style={tableInputStyle}
                          value={disc}
                          onChange={discChangeFunc}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        <input
                          type="number"
                          style={tableInputStyle}
                          value={quantity}
                          onChange={quantityChangeFunc}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {unitPurPrice}
                      </TableCell>

                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {itemName}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                          width: "12%",
                          textAlign: "center",
                        }}
                        align="center"
                      >
                        <input
                          type="number"
                          style={tableInputStyle}
                          value={itemCode}
                          onChange={codeChangeFunc}
                        />
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {rows.map((row) => (
                    <TableRow
                      key={row.code}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ fontWeight: "500" }}
                    >
                      {/*******/}
                      <TableCell
                        style={{
                          fontWeight: "900",
                          border: "none",
                        }}
                        align="center"
                      >
                        {showCancelRow ? (
                          <CancelSharp
                            style={{
                              color: "#B81414",
                              fontSize: "26px",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteRow(row)}
                          />
                        ) : null}
                      </TableCell>

                      {/*******/}
                      <TableCell
                        style={{
                          border: "3px double black",
                          fontWeight: "900",
                        }}
                        align="center"
                      >
                        {parseInt(row.totalPrice).toFixed(4)}
                        {/* {row.name} */}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {row.tax}
                        {/* {row.calories} */}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                          fontWeight: "900",
                        }}
                        align="center"
                      >
                        {/* {row.discount} */}
                        <input
                          type="text"
                          style={tableInputStyle}
                          value={row.discount}
                          onChange={discChangeFunc}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {/* {row.fat} */}
                        <input
                          type="text"
                          style={tableInputStyle}
                          //value={row.fat}
                          value={row.quantity}
                          onChange={quantityChangeFunc}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {row.productPurchasingPrice}
                        {/* {row.carbs} */}
                      </TableCell>

                      <TableCell
                        style={{
                          border: "3px double black",
                        }}
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "3px double black",
                          width: "12%",
                          textAlign: "center",
                        }}
                        align="center"
                      >
                        {/* {row.name} */}
                        <input
                          type="text"
                          className="inputTable"
                          style={tableInputStyle}
                          value={row.code}
                          onChange={() => codeRowChangeFunc(row.code)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* ///////////////////////////////////////// */}

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // style={{ border: "3px double black" }}
                  >
                    {/*
                     */}
                    <TableCell
                      style={{
                        border: "none",
                      }}
                      align="center"
                    ></TableCell>
                    {/*
                     */}
                    <TableCell
                      style={{
                        border: "3px double black",
                      }}
                      align="center"
                    >
                      {/* 4444 */}
                      {invoiceTotal}
                    </TableCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#0d9464",
                        fontWeight: "900",
                      }}
                      align="center"
                      colSpan={3}
                    >
                      صافى الفاتورة
                    </CustomCell>
                    <InfoCell
                      style={{
                        border: "3px double black",
                      }}
                      colSpan={4}
                      rowSpan={5}
                    >
                      <p
                        style={{
                          fontWeight: "800",
                          fontSize: "16px",
                        }}
                      >
                        ملاحظات وتعليمات
                      </p>
                      <p style={{ fontWeight: "500", fontSize: "16px" }}>
                        تستحق قيمة الفاتورة خلال 30 يوم من استلامها
                        <br />
                        يرجي كتابة قيمة الشيك باسم (اسم الشركة)
                        <br />
                        او ايداع المبلغ الي بنك حساب رقم
                      </p>
                    </InfoCell>
                  </TableRow>

                  {/* /////////////////////////////////////////// */}

                  {/* <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ border: "3px double black" }}
                >
                  <TableCell
                    style={{
                      border: "3px double black",
                    }}
                    align="center"
                  >
                    4444
                  </TableCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0d9464",
                    }}
                    align="center"
                    colSpan={3}
                  >
                    قيمة الخصم
                  </CustomCell>
                </TableRow> */}
                  {/* ////////////////////////////// */}
                  {/* <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ border: "3px double black" }}
                >
                  <TableCell
                    style={{
                      border: "3px double black",
                    }}
                    align="center"
                  >
                    4444
                  </TableCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#0d9464",
                    }}
                    align="center"
                    colSpan={3}
                  >
                    صافي الفاتورة
                  </CustomCell>
                </TableRow> */}
                  {/* ////////////////////////////////// */}

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // style={{ border: "3px double black" }}
                  >
                    {/****************/}
                    <TableCell align="center"></TableCell>
                    {/*********/}
                    <TableCell
                      style={{
                        border: "3px double black",
                      }}
                      align="center"
                    >
                      {/* 4444 */}
                      <input
                        type="number"
                        style={tableInputStyle}
                        value={collection}
                        max={invoiceTotal}
                        // onBlur={print}
                        onChange={collectionChangeFunc}
                      />
                    </TableCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#0d9464",
                      }}
                      align="center"
                      colSpan={3}
                    >
                      التحصيل
                    </CustomCell>
                  </TableRow>
                  {/* ////////////////////////////////// */}

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // style={{ border: "3px double black" }}
                  >
                    {/*********/}
                    <TableCell align="center"></TableCell>
                    {/*********/}
                    <TableCell
                      style={{
                        border: "3px double black",
                      }}
                      align="center"
                    >
                      {restInvoice}
                    </TableCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        color: "#0d9464",
                      }}
                      align="center"
                      colSpan={3}
                    >
                      الباقي
                    </CustomCell>
                  </TableRow>
                </CustomTableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ display: "flex", padding: 20 }}>
            {normalFlag ? (
              <>
                {/* <Button
                  style={{
                    width: 80,
                    color: "black",
                    borderRadius: 20,
                    marginRight: 8,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                  onClick={() => {
                    setShowPlus(false);
                    setNormalFlag(false);
                  }}
                >
                  تعديل
                </Button> */}
                {/* <Button
                  style={{
                    width: 80,
                    color: "white",
                    backgroundColor: "#0d9464",
                    borderRadius: 20,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                >
                  طباعة
                </Button> */}
                <ReactToPrint
                  trigger={() => (
                    <Button
                      style={{
                        width: 80,
                        color: "white",
                        backgroundColor: "#0d9464",
                        borderRadius: 20,
                        boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                      }}
                    >
                      طباعة
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </>
            ) : (
              <>
                <Button
                  style={{
                    width: 80,
                    color: "black",
                    borderRadius: 20,
                    marginRight: 8,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                  //onClick={() => setNormalFlag(true)}
                  onClick={cancelInvoiceFunc}
                >
                  الغاء
                </Button>
                <Button
                  style={{
                    width: 80,
                    color: "white",
                    backgroundColor: "#0d9464",
                    borderRadius: 20,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                  // onClick={() => setNormalFlag(true)}
                  onClick={confirmSalesInvoice}
                >
                  تاكيد
                </Button>
              </>
            )}
          </div>
        </Container>
      </DivWrapper>
      {/****** confirm modal ******/}

      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle
          style={{ padding: "0.5em", fontWeight: "600", fontSize: "large" }}
        >
          <p style={{ marginRight: "1em" }}> هل تريد تأكيد الفاتورة ؟</p>
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
}
