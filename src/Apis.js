//import { darken } from "@mui/material";
import axios from "axios";

export const loginApi = (data) => {
  let response = axios.post("/api/v1/user/login", data);
  return response;
}; // login api

export const companyInfo = () => {
  let response = axios.get("/api/v1/company/info");
  return response;
}; // get company info api

export const clientSupplierCode = (data) => {
  let response = axios.post("/api/v1/externalParty/create", data);
  return response;
}; // create client or supplier api

export const getProductNextCode = () => {
  let response = axios.get("/api/v1/product/getCode/");
  return response;
}; // get next code api

export const searchByName = (name) => {
  let response = axios.get(`/api/v1/externalParty/searchByName/${name}`);
  return response;
}; // search by name api

export const searchByCode = (code) => {
  let response = axios.get(`/api/v1/externalParty/searchByCode/${code}`);
  return response;
}; // search by code api
export const searchExternalParty = (value) => {
  let response = axios.get(`/api/v1/externalParty/search/?searchParam=${value}`);
  return response;
}; // search by code api

export const getAllClientsSuppliers = () => {
  let response = axios.get(`/api/v1/externalParty/all`);
  return response;
}; // end of getAllClientsSuppliers api

export const createProduct = (data) => {
  let response = axios.post(`/api/v1/product/create`, data);
  return response;
}; // end of create product function

export const getAllProducts = () => {
  let response = axios.get(`/api/v1/product/search?searchParam=`);
  return response;
}; // end of get all products function

export const searchProductByCode = (data) => {
  let response = axios.get(`/api/v1/product/search?searchParam=${data}`);
  return response;
}; // end of get all products function
export const searchStoreProductByCode = (data) => {
  let response = axios.get(`/api/v1/product/searchTable?searchParam=${data}`);
  return response;
}; // end of get all products function
// TODO
export const calcProductTotalPricePur = (data) => {
  let response = axios.post(
    `/api/v1/invoice/calculateProductTotalPrice/purchasing`,
    data
  );
  return response;
}; // end of calcProductTotalPrice function
export const calcProductTotalPriceSel = (data) => {
  let response = axios.post(
    `/api/v1/invoice/calculateProductTotalPrice/selling`,
    data
  );
  return response;
}; // end of calcProductTotalPrice function
export const createInvoice = (data) => {
  let response = axios.post(`/api/v1/invoice/create`, data);
  return response;
}; // end of createInvoice function
export const getAllInvoices = async () => {
  let response = axios.get(`api/v1/invoice/all`);
  return response;
};

export const updateProduct = (data) => {
  let response = axios.put(`/api/v1/product/update`, data);
  return response;
}; // end of updateProduct function

export const updateClientSupplier = (data) => {
  let response = axios.put(`/api/v1/externalParty/update`, data);
  return response;
}; // end of updateClientSupplier function

export const getInvoiceNumber = () => {
  let response = axios.get(`/api/v1/invoice/getCode`);
  return response;
}; // end of getInvoiceNumber function

export const getClientSupplierNextCode = (data) => {
  let response = axios.get(`/api/v1/externalParty/nextCode?client=${data}`);
  return response;
}; // end of getClientSupplierNextCode function

export const updateInvoice = (data) => {
  let response = axios.put(`/api/v1/invoice/update`, data);
  return response;
}; // end of updateInvoice function
