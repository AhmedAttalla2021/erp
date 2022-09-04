import styled from "styled-components";
import TableCell from "@mui/material/TableCell";
import { TableBody, TableHead } from "@mui/material";

export const Header = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

export const LogoDiv = styled.div`
  width: 120px;
  > img {
    width: 100%;
  }
`;
export const CompanyTitle = styled.div`
  text-align: center;
  flex: 1;
  h2 {
    color: #0d9464;
  }
`;

export const CommercialDiv = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > p {
    font-weight: 500;
  }
`;

export const CustomTableHead = styled(TableHead)`
  &.MuiTableHead-root {
    background-color: #e8e9dc;
    border: 3px double black;

    .MuiTableCell-head {
      color: #0d9464;
      font-weight: 900;
    }
  }
`;
export const CustomCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 8px;
  }
`;

export const InfoCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 0px;
    text-align: right;
    vertical-align: top;
    > p {
      padding: 10px;
      font-wight: 500;
      font-size: 18px;
    }
    > p:first-child {
      color: #0d9464;
      font-wight: 500;
      font-size: 22px;
      border-bottom: 2px dashed black;
    }
  }
`;

export const AddIconRow = styled.div`
  position: absolute;
  left: 101%;
  top: 0;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 22px;
  background: #0d9464;
  color: white;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

export const CustomerName = styled.div`
  direction: rtl;
  display: flex;
  > p {
    padding-bottom: 10px;
  }
  > p:last-child {
    border-bottom: 1px dashed black;
    flex: 1;
  }
`;

export const CustomTableBody = styled(TableBody)`
  &.MuiTableBody-root {
    .MuiTableCell-body {
      font-weight: 900 !important;
    }
  }
`;
