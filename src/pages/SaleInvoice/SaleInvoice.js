import { Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import ReactToPrint from "react-to-print";
import CancelSharp from "@mui/icons-material/CancelSharp";
//import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { message } from "antd";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  Container,
  Grid,
  Table as muiTable,
  TableContainer,
  Button,
  TableCell,
} from "@mui/material";
import {
  Header,
  LogoDiv,
  CompanyTitle,
  CustomTableHead,
  InfoCell,
  CommercialDiv,
  AddIconRow,
  CustomerName,
  CustomTableBody,
  CustomCell,
  DivWrapper,
} from "../Invoice.styled";
import mainLogo from "../../assets/mainLogo.png";
import {
  companyInfo,
  getAllClientsSuppliers,
  searchByCode,
  searchProductByCode,
  calcProductTotalPriceSel,
  createInvoice,
  getInvoiceNumber,
  getAllInvoices,
} from "../../Apis";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MainLayout from "../MainLayout/MainLayout";
import { useParams } from "react-router-dom";
//import { useSearchParams } from "react-router-dom";
import "./SalesInvoice.css";
function createData(total, tax, discount, quantity, capricerbs, name, code) {
  return { total, tax, discount, quantity, capricerbs, name, code };
}

/*************** editable table ******************************/

const EditableContext = React.createContext(null);

/************************************ */

export const SaleInvoice = (props) => {
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
  const [invoiceTotalToggle, setInvoiceTotalToggle] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceToggle, setInvoiceToggle] = useState(true);
  const [date, setDate] = useState("");
  const [normalFlag, setNormalFlag] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const [showCancelRow, setShowCancelRow] = useState(true);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { id } = useParams();
  const params = useParams();
  const myParams = useParams();
  const clientCodeRef = useRef();

  /***************************************** */
  /**************** */

  useEffect(() => {
    let res = 0;
    for (let i = 0; i < dataSource.length; i++) {
      res += dataSource[i].total;
    }
    setInvoiceTotal(res);
    setRestInvoice(res - collection);
  }, [invoiceTotalToggle, collection]);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const handleAdd = () => {
    console.log("itemCode", itemCode);
    const newData = {
      key: count,
      code: "",
      name: "",
      price: "",
      quantity: "",
      discount: 0,
      tax: "",
      total: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    // const handleAdd = () => {
    //   console.log("itemCode", itemCode);
    //   const newData = {
    //     key: count,
    //     code: "",
    //     name: "",
    //     price: "",
    //     quantity: "",
    //     discount: 0,
    //     tax: "",
    //     total: "",
    //   };
    //   setDataSource([...dataSource, newData]);
    //   setCount(count + 1);
    // };

    const save = async (e, record) => {
      console.log("record", record);
      // console.log("dataIndex", dataIndex);
      // console.log("e.target.value", e.target.value);

      // document
      //   .getElementById(Object.keys(record)[currentDataIndex + index])
      //   ?.focus() ||
      //   document
      //     .getElementById(Object.keys(record)[currentDataIndex + ++index])
      //     ?.focus();
      try {
        if (dataIndex === "code") {
          if (e.target.value === "c" || e.target.value === "ط") {
            handleConfirmModal();
          } else {
            try {
              let data = await searchProductByCode(e.target.value);
              console.log("data.data[0]", data.data[0]);
              record.code = data.data[0].code;
              record.name = data.data[0].name;
              record.price = data.data[0].productSellingPrice;
              record.tax = data.data[0].tax;
            } catch {
              message.error("لا يوجد صنف بهذا الكود");
            }
          }
        }
        if (dataIndex === "quantity") {
          let data = await searchProductByCode(record.code);
          record.quantity = e.target.value;
          // record.discount = 0;
          let obj = {
            code: record.code,
            name: record.name,
            quantity: record.quantity,
            productPurchasingPrice: data.data[0].productPurchasingPrice,
            productSellingPrice: record.price,
            purchasingPrice: data.data[0].purchasingPrice,
            sellingPrice: data.data[0].sellingPrice,
            tax: record.tax,
            discount: 0,
          };

          //console.log("obj", obj);
          let total = await calcProductTotalPriceSel(obj);
          //console.log("total", total);
          //console.log("record", record);
          record.total = total.data.totalPrice;

          let objjj = {
            id: data.data[0].id,
            code: parseInt(record.code),
            name: record.name,
            quantity: parseInt(record.quantity),
            productPurchasingPrice: data.data[0].productPurchasingPrice,
            productSellingPrice: record.price,
            purchasingPrice: data.data[0].purchasingPrice,
            sellingPrice: data.data[0].sellingPrice,
            discount: 0,
            tax: record.tax,
            totalPrice: record.total,
          };
          // let arr = [];
          if (rows.length !== 0) {
            for (let i = 0; i < rows.length; i++) {
              if (rows[i].id === objjj.id) {
                rows.splice(rows.indexOf(rows[i]), 1);
                rows.push(objjj);
              } else {
                rows.push(objjj);
              }
            }
          } else {
            rows.push(objjj);
          }
          setInvoiceTotalToggle(!invoiceTotalToggle);
          //console.log("record", data.data.totalPrice);
        }
        if (dataIndex === "discount") {
          handleAdd();
          if (record.quantity !== "") {
            let data = await searchProductByCode(record.code);
            record.discount = e.target.value;
            // record.discount = 0;
            let obj = {
              code: record.code,
              name: record.name,
              quantity: record.quantity,
              productPurchasingPrice: data.data[0].productPurchasingPrice,
              productSellingPrice: record.price,
              purchasingPrice: data.data[0].purchasingPrice,
              sellingPrice: data.data[0].sellingPrice,
              tax: record.tax,
              discount: record.discount,
            };
            //console.log("obj", obj);
            let total = await calcProductTotalPriceSel(obj);
            //console.log("total", total);
            //console.log("record", record);
            record.total = total.data.totalPrice;
            let objjj = {
              id: data.data[0].id,
              code: parseInt(record.code),
              name: record.name,
              quantity: parseInt(record.quantity),
              productPurchasingPrice: data.data[0].productPurchasingPrice,
              productSellingPrice: record.price,
              purchasingPrice: data.data[0].purchasingPrice,
              sellingPrice: data.data[0].sellingPrice,
              discount: parseInt(record.discount),
              tax: record.tax,
              totalPrice: record.total,
            };
            // let arr = [];
            if (rows.length !== 0) {
              for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === objjj.id) {
                  rows.splice(rows.indexOf(rows[i]), 1);
                  rows.push(objjj);
                } else {
                  rows.push(objjj);
                }
              }
            } else {
              rows.push(objjj);
            }
            setInvoiceTotalToggle(!invoiceTotalToggle);
            /////////////

            // const newData = {
            //   key: count,
            //   code: "",
            //   name: "",
            //   price: "",
            //   quantity: "",
            //   discount: 0,
            //   tax: "",
            //   total: "",
            // };
            // setDataSource([...dataSource, newData]);
            // setCount(count + 1);
            ///////////////

            console.log("dataSource", dataSource);
            //console.log("record", data.data.totalPrice);
          } else {
            //record.discount = 0;
            console.log("currentRecord", record);
            message.error("من فضلك ادخل الكمية اولا ثم اعد ادخال قيمة الخصم");
          }
        }

        // let data = await searchProductByCode(e.target.value);
        //record.name = data.data[0].name;
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
        console.log("e", e);
        setItemCode(e.target.value);
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    }; // end of save function

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} مطلوب `,
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={(e) => save(e, record)}
            onBlur={(e) => save(e, record)}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  /****************** */
  /******************************************** */

  /*********************************** */
  /*************************************** */
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      code: "",
      name: "",
      price: "",
      quantity: "",
      discount: 0,
      tax: "",
      total: "",
    },
    // {
    //   key: "1",
    //   name: "Edward King 1",
    //   age: "32",
    //   address: "London, Park Lane no. 1",
    // },
  ]);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "كود الصنف",
      dataIndex: "code",

      editable: true,
    },
    {
      title: "اسم الصنف",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "سعر الوحدة",
      dataIndex: "price",
    },
    {
      title: "الكمية",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "قيمة الخصم ",
      dataIndex: "discount",
      editable: true,
    },
    {
      title: "الضريبة",
      dataIndex: "tax",
    },
    {
      title: "الإجمالى",
      dataIndex: "total",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // const handleAdd = () => {
  //   console.log("itemCode", itemCode);
  //   const newData = {
  //     key: count,
  //     code: "",
  //     name: "",
  //     price: "",
  //     quantity: "",
  //     discount: 0,
  //     tax: "",
  //     total: "",
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  /******************************** */
  /********************************* */

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
      let myArr = [];
      console.log("oooobj", obj);
      for (let i = 0; i < obj.prodcuts.length; i++) {
        let objData = {
          key: "",
          code: obj.prodcuts[i].code,
          name: obj.prodcuts[i].name,
          price: obj.prodcuts[i].prodcutsellingPrice,
          quantity: obj.prodcuts[i].quantity,
          discount: obj.prodcuts[i].discount,
          tax: obj.prodcuts[i].tax,
          total: obj.prodcuts[i].totalPrice,
        };
        myArr.push(objData);
      }
      console.log("myArr", myArr);
      setDataSource([...myArr]);
      // setInvoiceTotal(obj.totalAmount.toFixed(4));
      // setCollection(obj.paidAmount);
      // setRestInvoice(obj.remainingAmount.toFixed(4));
      // setRows([...obj.prodcuts]);
      console.log("oooobj", obj.prodcuts);
      // setDataSource([...obj.products]);
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
    console.log("myParams", myParams);
    getInvoiceNum();
  }, [invoiceToggle]); // get invoice number

  const getInvoiceNum = async () => {
    let data = await getInvoiceNumber();
    setInvoiceNumber(data.data);
    console.log("invoiceNumber", data.data);
  }; // end of getInvoiceNum function

  useEffect(() => {
    getDate();
  }, []); // get date and make client code focused //////
  const getDate = () => {
    if (!myParams.id) {
      clientCodeRef.current.focus();
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let theDate = `${yyyy}-${mm}-${dd}`;
    console.log("today", theDate);
    setDate(theDate);
  }; // end of get date function

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
    let data = await calcProductTotalPriceSel(obj);
    setItemTotal(data.data.totalPrice.toFixed(4));
    console.log("clacTotalPrice", data.data.totalPrice);

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
    console.log("co000llection", collection);
  }; // end of calculate product total func

  // useEffect(() => {
  //   if (itemCode !== "") {
  //     getProductByCode();
  //   } else {
  //     setItemName("");
  //     setUnitPrice("");
  //     setUnitTax("");
  //   }
  // }, [itemCode]);
  // const getProductByCode = async () => {
  //   let data = await searchProductByCode(itemCode);
  //   console.log("proData", data.data[0]);
  //   setItemId(data.data[0].id);
  //   setItemName(data.data[0].name);
  //   setUnitPrice(data.data[0].productSellingPrice.toFixed(4));
  //   setUnitTax(data.data[0].tax);
  //   setUnitPurPrice(data.data[0].productPurchasingPrice);
  //   setItemSellPrice(data.data[0].sellingPrice);
  //   setItemPurPrice(data.data[0].purchasingPrice);
  // }; // end of

  useEffect(() => {
    console.log("path: ", window.location);
    // console.log("props: ", props);
  }, []);
  const tableInputStyle = {
    width: "90%",
    margin: "auto",
    textAlign: "center",
    boxShadow: "0 0 3px gray",
    outline: "none",
  };

  useEffect(() => {
    if (clientCode !== "") {
      getClientName();
    }
  }, [clientCode]);
  const getClientName = async () => {
    //let code = parseInt(clientCode);
    let data = await searchByCode(parseInt(clientCode));
    console.log("Clientdata", data.data);
    setClientName(data.data.name);
    setClientId(data.data.id);

    //console.log("clientCode", typeof parseInt(clientCode));
  }; // end of getClientName function

  useEffect(() => {
    getAllClients();
  }, []);

  const getAllClients = async () => {
    let data = await getAllClientsSuppliers();
    console.log("data", data.data);
    let clients = data.data.filter((item) => item.client == true);
    setClientsArr(clients);
  }; // end of getAllClients function

  console.log(props, "ooooooooooo");

  useEffect(() => {
    if (id) {
      setNormalFlag(true);
      console.log("id", id);
    } else {
      setNormalFlag(false);
    }
  }, [id]);
  useEffect(() => {
    console.log("params", params);
    companyInfoData();
  }, []);

  let companyInfoData = async () => {
    let data = await companyInfo();
    console.log("data", data);
    setCompanyName(data.data.name);
    setCommercialNum(data.data.commercialRegistryNumber);
    setTaxNum(data.data.taxRegistryNumber);
    setVat(data.data.vat);
  };
  const addNewRow = async () => {
    const arrValues = [...rows];
    arrValues.push(proData);

    setRows([...arrValues]);
    console.log("roooooooows", rows);
    /**** */
    setQuantity(0);

    setDisc(0);
    setItemCode("");
    setItemName("");

    setUnitPrice(0);
    setUnitTax(0);
    setItemTotal(0);
    // const [unitPurPrice, setUnitPurPrice] = useState("");
    // const [itemSellPrice, setItemSellPrice] = useState("");
    // const [itemPurPrice, setItemPurPrice] = useState("");
    /**** */
    // const newValues = [...rows];
    // newValues.push(
    //   createData(
    //     itemTotal,
    //     unitTax,
    //     disc,
    //     quantity,
    //     unitPrice,
    //     itemName,
    //     itemCode
    //   )
    // );

    // setRows([...newValues]);
  };
  useEffect(() => {
    calcInvoiceTotal();
  }, [rows, itemTotal]); // صافى الفاتورة
  const calcInvoiceTotal = () => {
    let res = 0;
    if (rows.length !== 0) {
      for (let i = 0; i < rows.length; i++) {
        res += parseInt(rows[i].totalPrice);
      }
      setInvoiceTotal(parseInt(res).toFixed(4));
      setRestInvoice((res - collection).toFixed(4));
    }
    //  else if (rows.length === 0 && itemTotal === 0) {
    //   setCollection(0);
    // }
    else {
      setInvoiceTotal(parseInt(itemTotal).toFixed(4));
      if (parseInt(itemTotal) !== 0) {
        setRestInvoice(parseInt(itemTotal - parseInt(collection)).toFixed(4));
      } else {
        setRestInvoice(itemTotal);
      }
    }
  }; // end of calcInvoiceTotal function
  const discChangeFunc = (e) => {
    setDisc(e.target.value);
    // if (e.target.value === "") {
    //   setDisc(0);
    // }
    console.log("discvalue", typeof e.target.value);
  };
  const quantityChangeFunc = (e) => {
    setQuantity(e.target.value);
  };
  const codeChangeFunc = (e) => {
    setItemCode(e.target.value);
    console.log("item code", typeof e.target.value);
  };
  const test = (o, row) => {
    // for (let i = 0; i < rows.length; i++) {
    //   if (rows[i].code === e) {
    //     rows[i].code = o.target.value;
    //     console.log("rows[i].code", rows[i].code);
    //   }
    // }
    console.log("o", o);
    console.log("row", row);

    // console.log("o", o.target.value);
  };

  const changeClientCodeFunc = (e) => {
    //console.log("clientcode", e.target.value);
    if (myParams.id) {
      setClientCode(clientCode);
    } else {
      setClientCode(e.target.value);
    }

    if (e.target.value === "") {
      setClientName("");
    }

    /*** */
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
        message.warning("قيمة التحصيل لا يجب ان تكون اكبر من صافى الفاتورة");
        e.preventDefault();
      } else {
        setCollection(e.target.value);
        setRestInvoice(invoiceTotal - e.target.value);
      }
    }

    //setRestInvoice(invoiceTotal - e.target.value);
  };
  //const blurFunc = () => {
  //   let arr = clientsArr.filter((client) => client.code === clientCode);
  //   setClientName(arr[0]);
  //   console.log("clientName", arr);
  //  };

  const confirmSalesInvoice = async () => {
    setOpenConfirmModal(true);
    // try {
    //   if (rows.length !== 0) {
    //     console.log("rows", rows);
    //     let obj = {
    //       invoiceType: "selling",
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
    //       invoiceType: "selling",
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
    //     //  console.log("objjjj", objj);
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
    setDisc(0);
    setQuantity(0);
  };
  const cancelInvoicePrintFunc = () => {
    //setNormalFlag(true);
    setShowPlus(true);
    setShowCancelRow(true);
    setNormalFlag(false);
    rows.length = 0;
    setItemTotal(0);
    setRestInvoice(0);
    setCollection(0);
    setInvoiceTotal(0);
    setClientCode("");
    setClientName("");
    setItemCode("");
    setDisc(0);
    setQuantity(0);
  };
  const deleteRow = (row) => {
    console.log("row", row);
    const arr = [...rows];
    arr.splice(arr.indexOf(row), 1);
    setRows([...arr]);
    if (arr.length === 0 && parseInt(itemTotal) === 0) {
      setCollection(0);
    }
  };

  const componentRef = useRef();
  const printBtnRef = useRef();

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  }; // end of handleCloseConfrimModal function
  const handleConfirmModal = async () => {
    try {
      //if (rows.length !== 0) {
      console.log("rows", rows);
      let obj = {
        invoiceType: "selling",
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
      console.log("obj", obj);
      let data = await createInvoice(obj);
      console.log("invoiceData", data);
      // } else {
      // console.log("itemTotal", itemTotal);
      // console.log("rows", rows);
      // let arr = [];
      // let myObj = {
      //   id: itemId,
      //   code: itemCode,
      //   name: itemName,
      //   quantity: quantity,
      //   productPurchasingPrice: unitPurPrice,
      //   productSellingPrice: unitPrice,
      //   purchasingPrice: itemPurPrice,
      //   sellingPrice: itemSellPrice,
      //   discount: disc,
      //   tax: unitTax,
      //   totalPrice: itemTotal,
      // };
      // arr.push(myObj);

      // let objj = {
      //   invoiceType: "selling",
      //   invoiceNumber: invoiceNumber,
      //   invoiceCreationDate: date,
      //   totalAmount: invoiceTotal,
      //   paid: true,
      //   remainingAmount: restInvoice,
      //   paidAmount: collection,
      //   termsAndConditions: "aaaa",
      //   externalParty: {
      //     id: clientId,
      //     code: clientCode,
      //     name: clientName,
      //     client: true,
      //   },
      //   prodcuts: [...arr],
      // };
      // let data = await createInvoice(objj);
      // console.log("invoiceData", data);
      // console.log("rest", restInvoice);
      // console.log("arr", arr);
      //  console.log("objjjj", objj);
      // }
      message.success("تم تأكيد الفاتورة بنجاح");
      setNormalFlag(true);
      setShowPlus(false);
      setShowCancelRow(false);
    } catch {
      message.error(" فشل تأكيد الفاتورة");
    }
    // }

    setInvoiceToggle(!invoiceToggle);
    setOpenConfirmModal(false);
  }; // end of handleConfrimModal function

  return (
    <MainLayout>
      <DivWrapper
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f6f5f5",
          // padding: "30px",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div className="printDiv" ref={componentRef}>
            <Header className="mainHeader">
              <h2
                style={{
                  fontSize: "28px",
                  fontFamily: "'Tajawal' , sans-serif",
                }}
                className="title"
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
                    {/* <p>ضريبة القيمة المضافة : %12</p> */}
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
                  فاتورة مبيعات
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <p style={{ fontWeight: "500" }}> التاريخ : 1-6-2022</p> */}
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
              </Grid>
              <Grid item xs={12}>
                <div
                  className="clientCodeNameDiv"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",

                    marginTop: "2em",
                    width: "94%",
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
                      }}
                    >
                      {/* شركة مدعوم للمنتجات الطبية */}
                      {clientName}
                    </div>
                    <p className="clientNameTxt" style={{ fontWeight: "bold" }}>
                      {" "}
                      إسم العميل{" "}
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
                      ref={clientCodeRef}
                      value={clientCode}
                      onChange={changeClientCodeFunc}
                      // onPressEnter={console.log("dataSource", dataSource)}
                      onKeyDown={(e) => {
                        // console.log("e", e.code);
                        if (e.key === "Enter") {
                          console.log(dataSource);
                        }
                      }}
                      //onBlur={blurFunc}
                    />
                    <p
                      className="clientCodeTxt"
                      style={{ width: "80%", fontWeight: "bold" }}
                    >
                      {" "}
                      كود العميل{" "}
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>

            <TableContainer component={Paper} style={{ padding: 40 }}>
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",
                  //alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    // border: "3px double black",
                  }}
                >
                  <Table
                    style={{
                      direction: "rtl",

                      width: "100%",
                    }}
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered={true}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 700 }}
                  />
                  <div
                    style={{
                      width: "100%",
                      // height: "100px",
                      // backgroundColor: "red",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "48.9%",
                        display: "flex",
                        flexDirection: "column",
                        border: "3px double black",
                      }}
                    >
                      <section style={{ display: "flex", height: "33.333%" }}>
                        <div
                          style={{
                            width: "50%",
                            // height: "3em",
                            border: "3px double black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {invoiceTotal}{" "}
                        </div>
                        <div
                          style={{
                            width: "50%",
                            //height: "3em",
                            border: "3px double black",

                            color: "#0d9464",
                            fontWeight: "600",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          صافى الفاتورة{" "}
                        </div>
                      </section>
                      <section style={{ display: "flex", height: "33.333%" }}>
                        <div
                          style={{
                            width: "50%",
                            //height: "3em",
                            border: "3px double black",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="number"
                            style={tableInputStyle}
                            value={collection}
                            max={invoiceTotal}
                            onChange={collectionChangeFunc}
                          />
                        </div>
                        <div
                          style={{
                            width: "50%",
                            // height: "3em",
                            border: "3px double black",
                            color: "#0d9464",
                            fontWeight: "700",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          التحصيل
                        </div>
                      </section>
                      <section style={{ display: "flex", height: "33.333%" }}>
                        <div
                          style={{
                            width: "50%",
                            // height: "3em",
                            border: "3px double black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {restInvoice}{" "}
                        </div>
                        <div
                          style={{
                            width: "50%",
                            //height: "3em",
                            border: "3px double black",
                            color: "#0d9464",
                            fontWeight: "700",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          الباقى{" "}
                        </div>
                      </section>
                    </div>
                    <div style={{ width: "51.9%", border: "3px double black" }}>
                      <section
                        style={{
                          width: "100%",
                          height: "33.333%",
                          //border: "1px solid black",
                          borderBottom: "3px dashed black",
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          padding: "1em",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "800",
                            fontSize: "16px",
                            color: "#0d9464",
                          }}
                        >
                          {" "}
                          ملاحظات وتعليمات{" "}
                        </p>{" "}
                      </section>
                      <section
                        style={{
                          width: "100%",
                          //height: "6em",
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          padding: "1em",
                        }}
                      >
                        <p style={{ fontWeight: "500", fontSize: "16px" }}>
                          تستحق قيمة الفاتورة خلال 30 يوم من استلامها يرجي كتابة
                          قيمة الشيك باسم (اسم الشركة) او ايداع المبلغ الي بنك
                          حساب رقم
                        </p>
                      </section>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                      height: "30px",
                      width: "30px",
                      border: "none",
                      borderRadius: "50%",
                      backgroundColor: "green",
                      fontSize: "30px",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                {/* <muiTable
                  sx={{
                    minWidth: 650,
                    border: "3px double black",
                    height: "max-content",
                    position: "relative",
                  }}
                  aria-label="simple table"
                > */}
                {/*  {showPlus ? (
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
                    ></TableCell>
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

                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
                        width: "25%",
                      }}
                      align="center"
                    >
                      اسم الصنف
                    </TableCell>
                    <TableCell
                      style={{
                        border: "3px double black",
                        fontWeight: "900",
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ fontWeight: "500" }}
                    >
                      <TableCell
                        style={{
                          fontWeight: "900",
                        }}
                        align="center"
                      ></TableCell>

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
                        {unitPrice}
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
                    <>
                      <TableRow
                        key={row.code}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        style={{
                          fontWeight: "500",
                        }}
                      >
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

                        <TableCell
                          style={{
                            border: "3px double black",
                            fontWeight: "900",
                          }}
                          align="center"
                        >
                          {parseInt(row.totalPrice).toFixed(4)}
                        </TableCell>
                        <TableCell
                          style={{
                            border: "3px double black",
                          }}
                          align="center"
                        >
                          {row.tax}
                        </TableCell>
                        <TableCell
                          style={{
                            border: "3px double black",
                            fontWeight: "900",
                          }}
                          align="center"
                        >
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
                          <input
                            type="text"
                            style={tableInputStyle}
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
                          {parseInt(row.productSellingPrice).toFixed(4)}
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
                          <input
                            type="text"
                            style={tableInputStyle}
                            value={row.code}
                            onChange={(o) => test(o, row)}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                        */}
                {/* <CustomTableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{
                        border: "none",
                      }}
                      align="center"
                    ></TableCell>

                    <TableCell
                      style={{
                        border: "3px double black",
                      }}
                      align="center"
                    >
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

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center"></TableCell>

                    <TableCell
                      style={{
                        border: "3px double black",
                      }}
                      align="center"
                    >
                      <input
                        type="number"
                        style={tableInputStyle}
                        value={collection}
                        max={invoiceTotal}
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

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center"></TableCell>

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
                </CustomTableBody> */}
                {/* </muiTable> */}
              </div>
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
                    setNormalFlag(false);
                    setShowPlus(false);
                  }}
                >
                  تعديل
                </Button> */}
                {/* <Button
                  style={{
                    width: 80,
                    color: "black",
                    borderRadius: 20,
                    marginRight: 8,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                  onClick={cancelInvoicePrintFunc}
                >
                  إلغاء
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
                      //onClick={handlePrint}
                      // ref={printBtnRef}
                    >
                      طباعة
                    </Button>
                  )}
                  content={() => componentRef.current}
                  //onBeforeGetContent={() => setPrintBtn(false)}
                  //pageStyle="marginTop=15em"
                />

                {/* <Button
                  style={{
                    width: 80,
                    color: "white",
                    backgroundColor: "#0d9464",
                    borderRadius: 20,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                  }}
                  //onClick={handlePrint}
                  ref={printBtnRef}
                >
                  طباعة
                </Button> */}
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
};
