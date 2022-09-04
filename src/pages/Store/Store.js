import * as React from "react";
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
} from "./Store.styled";
import "./Store.css";
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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../Components/Search/Search";
import {
  getProductNextCode,
  createProduct,
  getAllProducts,
  searchProductByCode,
  updateProduct,
  searchStoreProductByCode,
} from "../../Apis";
import MainLayout from "../MainLayout/MainLayout";
function createData(name, calories, fat, carbs, protein, code) {
  return { name, calories, fat, carbs, protein, code };
}

const rows = [
  createData(10, "Frozen yoghurt", 12, 1000, "بنادول", 1001),
  createData(10, "Ice cream sandwich", 12, 1000, "بنادول", 1002),
  createData(10, "Eclair", 12, 1000, "بنادول", 1003),
  createData(10, "Cupcake", 12, 1000, "بنادول", 10001),
  createData(10, "Frozen yoghurt", 12, 1000, "بنادول", 10001),
  createData(10, "Ice cream sandwich", 12, 1000, "بنادول", 10001),
  createData(10, "Frozen yoghurt", 12, 1000, "بنادول", 10001),
  createData(10, "Ice cream sandwich", 12, 1000, "بنادول", 10001),
  createData(10, "Frozen yoghurt", 12, 1000, "بنادول", 10001),
  createData(10, "Ice cream sandwich", 12, 1000, "بنادول", 10001),
  createData(10, "Frozen yoghurt", 12, 1000, "بنادول", 10001),
  createData(10, "Ice cream sandwich", 12, 5000, "بنادول اكسترا", 10005),
];

export default function Store() {
  const messageStyle = {
    zIndex: "999999999 ",
    fontSize: "30px",
  };

  /** select menu mui **/
  const [age, setAge] = React.useState("");
  /*** create product modal***/
  const [itemCode, setItemCode] = React.useState(1000011);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemPurchasePrice, setItemPurchasePrice] = useState("");
  const [itemSellPrice, setItemSellPrice] = useState("");
  const [unitPurchasePrice, setUnitPurchasePrice] = useState("");
  const [unitSellPrice, setUnitSellPrice] = useState("");
  const [tax, setTax] = useState("");
  /*********/
  /*** update product modal***/
  const [itemId, setItemId] = useState("");
  const [code, setCode] = useState();
  const [itemNameUpdate, setItemNameUpdate] = useState("");
  const [quantityUpdate, setQuantityUpdate] = useState("");
  const [itemPurchasePriceUpdate, setItemPurchasePriceUpdate] = useState("");
  const [itemSellPriceUpdate, setItemSellPriceUpdate] = useState("");
  const [unitPurchasePriceUpdate, setUnitPurchasePriceUpdate] = useState("");
  const [unitSellPriceUpdate, setUnitSellPriceUpdate] = useState("");
  const [taxUpdate, setTaxUpdate] = useState("");
  /*********/
  /*** details modal**/
  const [codeDetail, setCodeDetail] = useState("");
  const [nameDetail, setNameDetail] = useState("");
  const [quantityDetail, setQuantityDetail] = useState("");
  const [purchaseDetail, setPurchaseDetail] = useState("");
  const [sellDetail, setSellDetail] = useState("");
  const [taxDetail, setTaxDetail] = useState("");
  // const [itemCodeTxt, setItemCodeTxt] = React.useState(0);
  const [itemArr, setItemArr] = React.useState([1001]);
  //let itemArr = [1001];
  const handleSelectMenuChange = (event) => {
    setAge(event.target.value);
  };
  /****/
  /**dialog modal**/

  const [data, setData] = React.useState(rows);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [productsArr, setProductsArr] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    allProducts();
  }, []);
  const allProducts = async () => {
    let data = await getAllProducts();
    setProductsArr(data.data);
    console.log("allProducts", data.data);
  }; // end of get all products function

  useEffect(() => {
    searchByCode();
  }, [searchValue]);
  const searchByCode = async () => {
    let data = await searchStoreProductByCode(searchValue);
    setProductsArr(data.data);
    console.log("searchdata", data);
  }; // end of search by code function

  useEffect(() => {
    nextCode();
  }, []);
  const nextCode = async () => {
    let data = await getProductNextCode();
    console.log("data", data.data);
    setItemCode(data.data);
  }; // end of nextCode function
  const handleClickOpen = () => {
    setOpen(true);
    setItemName("");
    setQuantity("");
    setItemPurchasePrice("");
    setItemSellPrice("");
    setTax("");
  }; // end of handleClickOpen function
  const handleClickOpenUpdate = (row) => {
    setOpenUpdate(true);
    console.log("row", row);
    setCode(row.code);
    setItemNameUpdate(row.name);
    setUnitPurchasePriceUpdate(row.productPurchasingPrice);
    setUnitSellPriceUpdate(row.productSellingPrice);
    setItemPurchasePriceUpdate(row.purchasingPrice);
    setItemSellPriceUpdate(row.sellingPrice);
    setTaxUpdate(row.tax);
    setItemId(row.id);
    setQuantityUpdate(row.quantity);
  }; // end of handleClickOpenUpdate function
  const handleClickOpenDetails = (e) => {
    setOpenDetails(true);
    //console.log("e", e);
    setCodeDetail(e.code);
    setNameDetail(e.name);
    setQuantityDetail(e.quantity);
    setPurchaseDetail(e.purchasingPrice);
    setSellDetail(e.sellingPrice);
    setTaxDetail(e.tax);
  }; // end of handleClickOpenUpdate function

  const handleConfirmBtnItemCoding = async () => {
    // let data = await getProductNextCode();
    // console.log("data", data.data);
    // setItemCode(data.data);
    console.log("itemName", itemName);
    console.log("quantity", quantity);
    console.log("unitPurchasePrice", unitPurchasePrice);
    console.log("tax", tax);

    if (
      itemName === "" ||
      quantity === "" ||
      itemPurchasePrice === "" ||
      itemSellPrice === "" ||
      tax === ""
    ) {
      //message.error("هناك عنصر او اكثر فارغ يجب ادخال قيمة");
      message.error({
        content: "ooooooo",
        //style: messageStyle,
        className: "antdM",
      });
    } else {
      try {
        setUnitPurchasePrice(itemPurchasePrice / quantity);
        setUnitSellPrice(itemSellPrice / quantity);

        let itemData = {
          code: itemCode,
          name: itemName,
          quantity: quantity,
          productPurchasingPrice: unitPurchasePrice,
          productSellingPrice: unitSellPrice,
          purchasingPrice: itemPurchasePrice,
          sellingPrice: itemSellPrice,
          tax: tax,
        };

        console.log("itemData", itemData);
        let userData = await createProduct(itemData);
        console.log("userData", userData);
        let data = await getProductNextCode();
        console.log("data", data.data);
        setItemCode(data.data);
        allProducts();
        message.success("تم تكويد الصنف بنجاح");
        //setToggle(!toggle);
      } catch {
        message.error(" لم يتم تكويد الصنف");
      }
      // let val = itemArr.includes(itemCode);
      // if (val) {
      //   let lastItem = itemArr.pop();
      //   setItemCode(lastItem + 1);
      //   itemArr.push(lastItem);
      //   console.log("itemArr", itemArr);
      // } else {
      //   setItemCode(itemCode + 1);
      //   itemArr.push(itemCode);
      //   console.log("itemArr", itemArr);
      // }
      //console.log("items", itemArr);
      setOpen(false);
    }
  }; //end of handleConfirmBtnItemCoding function
  const handleCloseCodeItemModal = () => {
    setOpen(false);
  }; //end of handleCloseCodeItemModal function
  const handleCloseUpdateItemModal = () => {
    setOpenUpdate(false);
  }; // end of handleCloseUpdateItemModal function
  const handleConfirmUpdateItemModal = async () => {
    let itemData = {
      id: itemId,
      code: code,
      name: itemNameUpdate,
      quantity: quantityUpdate,
      productPurchasingPrice: unitPurchasePriceUpdate,
      productSellingPrice: unitSellPriceUpdate,
      purchasingPrice: itemPurchasePriceUpdate,
      sellingPrice: itemSellPriceUpdate,
      tax: taxUpdate,
    };
    try {
      let data = await updateProduct(itemData);
      console.log("updatedata", data);
      allProducts();
      message.success("تم تعديل الصنف بنجاح");
    } catch {
      alert("product not updated");
      message.error("لم يتم تعديل الصنف");
    }

    setOpenUpdate(false);
  }; // end of handleConfirmUpdateItemModal
  const handleCloseDetailsItemModal = () => {
    setOpenDetails(false);
  }; // end of handleCloseDetailsItemModal function

  /****/
  const handleChange = (e) => {
    if (e.target.value) {
      const newData = rows.filter((row) => row.code == e.target.value);
      setData([...newData]);
    } else {
      setData(rows);
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          width: "100%",
          height: "100vh",
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
          {/* <Header style={{ justifyContent: "space-between" }}> */}
          <div className="storeHeader">
            {/* <LogoDiv */}
            <div className="logoDiv" onClick={handleClickOpen}>
              <IoMdAddCircle className="storeCodingSvg" />
              <p className="storeCodingBtnPara">تكويد صنف</p>
            </div>
            {/* </LogoDiv> */}
            <div className="storeSearch">
              <Search
                handleChange={handleChange}
                // style={{ width: "80%" }}
                placeholder={`ابحث عن اسم / كود الصنف`}
                myOnChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
          </div>
          {/* </CompanyTitle> */}
          {/* </Header> */}

          <TableContainer
            component={Paper}
            style={{ width: "80%", margin: "2em auto" }}
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
                    سعر الوحدة
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    الوحدة
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    الصنف
                  </CustomCell>
                  <CustomCell
                    style={{
                      border: "3px double black",
                      color: "#E8E9DC ",
                      color: "white",
                    }}
                    align="center"
                  >
                    كود الصنف
                  </CustomCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsArr.length === 0 ? (
                  <TableRow>
                    <CustomCell
                      colSpan={6}
                      style={{ textAlign: "center", fontSize: "24px" }}
                    >
                      لايــــــــــــــــــوجد أصنـــــــــــــــــــــــــــاف
                    </CustomCell>
                  </TableRow>
                ) : null}
                {productsArr.map((row, index) => (
                  <TableRow
                    key={index}
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
                      <BsExclamationCircleFill
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickOpenDetails(row)}
                      />
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
                      <FaEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickOpenUpdate(row)}
                      />
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "15%",
                        color: "#1B4738 ",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {parseInt(row.productPurchasingPrice).toFixed(2)}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "15%",
                        color: "#1B4738 ",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.quantity}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "20%",
                        color: "#1B4738 ",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.name}
                    </CustomCell>
                    <CustomCell
                      style={{
                        border: "3px double black",
                        width: "15%",
                        color: "#1B4738 ",
                        fontWeight: "500",
                      }}
                      align="center"
                    >
                      {row.code}
                    </CustomCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      {/**** item code modal ****/}
      <Dialog open={open} onClose={handleCloseCodeItemModal}>
        <DialogTitle style={{ padding: "0.5em", fontWeight: "600" }}>
          <p style={{ marginRight: "1em" }}>تكويد الصنف</p>
        </DialogTitle>
        <DialogContent>
          {/* <formInputsDiv className="formInputsDiv">
            <Box
              sx={{
                minWidth: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "67%",
                marginRight: "3%",
                padding: "0.2em",
              }}
              className="storeSelectMenu"
            >
             
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleSelectMenuChange}
              >
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
                <MenuItem value={10}>2003</MenuItem>
                <MenuItem value={20}>2003</MenuItem>
                <MenuItem value={30}>2003</MenuItem>
              </Select>
              
            </Box>

            <Typography
              variant="h6"
              gutterBottom
              component="div"
              
              className="storeFormTypography"
            >
              كود المصدر
            </Typography>
          </formInputsDiv> */}
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemCode}
              onChange={(e) => setItemCode(parseInt(e.target.value))}
            />
            {/* <div
              className="formTextFeild"
              style={{ padding: "0.55em", backgroundColor: "#e6f8e8" }}
            >
              1001
            </div> */}

            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              كود الصــنف
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />

            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              اسم الصنف
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              الوحـــــــــــــــــــدة
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemPurchasePrice}
              onChange={(e) => {
                setItemPurchasePrice(e.target.value);
                // let unitPrice = itemPurchasePrice / quantity;
                // console.log("unitPurchasePrice", unitPrice);
                // setUnitPurchasePrice(unitPrice);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              سعر الشراء
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemSellPrice}
              onChange={(e) => {
                setItemSellPrice(e.target.value);
                // let unitPrice = itemSellPrice / quantity;
                // console.log("unitSellPrice", unitPrice);
                // setUnitSellPrice(unitPrice);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              سعر البيـــــــع
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={tax}
              onChange={(e) => {
                setTax(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              الضريــــــــــــــبة
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCodeItemModal}>إلغاء</Button>
          <Button
            onClick={handleConfirmBtnItemCoding}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/**** item update modal ****/}
      <Dialog open={openUpdate} onClose={handleCloseUpdateItemModal}>
        <DialogTitle
          style={{
            padding: "0.5em",
            fontWeight: "600",
            fontFamily: `"Tajawal, "sans-serif"`,
          }}
        >
          <p style={{ marginRight: "1em" }}>تعديل الصنف</p>
        </DialogTitle>
        <DialogContent>
          {/* <formInputsDiv className="formInputsDiv">
            <input type="text" className="formTextFeild" />

            <Typography
              variant="h6"
              gutterBottom
              component="div"
              
              className="storeFormTypography"
            >
              كود المصدر
            </Typography>
          </formInputsDiv> */}
          <formInputsDiv className="formInputsDiv">
            <input type="text" className="formTextFeild" value={code} />
            {/* <select name="cars" id="cars" className="formTextFeild">
              <option value="volvo"></option>
              <option value="saab">1001</option>
              <option value="mercedes">1002</option>
              <option value="audi">1003</option>
            </select> */}
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              كود الصــنف
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemNameUpdate}
              onChange={(e) => {
                setItemNameUpdate(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              اسم الصنف
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={quantityUpdate}
              onChange={(e) => {
                setQuantityUpdate(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              الوحـــــــــــــــــــدة
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemPurchasePriceUpdate}
              onChange={(e) => {
                setItemPurchasePriceUpdate(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              سعر الشراء قبل الضريبة
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={itemSellPriceUpdate}
              onChange={(e) => {
                setItemSellPriceUpdate(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              سعر البيع قبل الضريبة
            </Typography>
          </formInputsDiv>
          <formInputsDiv className="formInputsDiv">
            <input
              type="text"
              className="formTextFeild"
              value={taxUpdate}
              onChange={(e) => {
                setTaxUpdate(e.target.value);
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              // style={{
              //   width: "30%",
              //   fontWeight: "500",
              // }}
              className="storeFormTypography"
            >
              الضريــــــــــــــبة
            </Typography>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateItemModal}>إلغاء</Button>
          <Button
            onClick={handleConfirmUpdateItemModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/**** item details modal ****/}
      <Dialog open={openDetails} onClose={handleCloseDetailsItemModal}>
        <DialogTitle style={{ padding: "0.5em", fontWeight: "600" }}>
          <p style={{ marginRight: "0.7em" }}>تفاصيل الصنف</p>
        </DialogTitle>
        <DialogContent style={{ marginTop: "2em" }}>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              // style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{codeDetail}</p>
            </section>
            <section
              className="storeDetailsSec2"
              style={{
                fontSize: "16px",
              }}
            >
              <p style={{ fontWeight: "500" }}> : كـــــود الصنف</p>
            </section>
          </formInputsDiv>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              //style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{nameDetail}</p>
            </section>
            <section
              className="storeDetailsSec2"
              //style={{ width: "40%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{` :  اسم الصـنف`}</p>
            </section>
          </formInputsDiv>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              //style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{quantityDetail}</p>
            </section>
            <section
              className="storeDetailsSec2"
              // style={{ width: "40%", textAlign: "right" }}
            >
              <p
                style={{ fontWeight: "500" }}
              >{` :  الوحـــــــــــــــــــــدة `}</p>
            </section>
          </formInputsDiv>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              //style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{purchaseDetail}</p>
            </section>
            <section
              className="storeDetailsSec2"
              //style={{ width: "40%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{` :  سعر الشـراء`}</p>
            </section>
          </formInputsDiv>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              //style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{sellDetail}</p>
            </section>
            <section
              className="storeDetailsSec2"
              //style={{ width: "40%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{` :  سعر البيـــــــــع`}</p>
            </section>
          </formInputsDiv>
          <formInputsDiv
            className="formDetails"
            style={{ display: "flex", marginBottom: "1em" }}
          >
            <section
              className="storeDetailsSec1"
              // style={{ width: "60%", textAlign: "right" }}
            >
              <p style={{ fontWeight: "500" }}>{`${taxDetail}%`}</p>
            </section>
            <section
              className="storeDetailsSec2"
              //style={{ width: "40%", textAlign: "right" }}
            >
              <p
                style={{ fontWeight: "500" }}
              >{` :  الضريــــــــــــــــــبة`}</p>
            </section>
          </formInputsDiv>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsItemModal}>إلغاء</Button>
          {/* <Button
            onClick={handleCloseDetailsItemModal}
            style={{ backgroundColor: "#e6f8e8", padding: "0.2em" }}
          >
            تأكيد
          </Button> */}
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
