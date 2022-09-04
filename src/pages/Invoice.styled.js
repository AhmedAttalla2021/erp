import styled from "styled-components";
import TableCell from "@mui/material/TableCell";
import { TableBody, TableHead } from "@mui/material";

export const Header = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;
  > h2 {
    color: #0d9464;
  }
  > div {
    display: flex;
    align-items: center;
  }
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
`;

export const CommercialDiv = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
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
      font-weight: 600;
    }
  }
`;
export const CustomCell = styled(TableCell)`
  &.MuiTableCell-body {
  }
`;

export const DivWrapper = styled.div`
  width: 100%;
  height: 100%;
  backgroundcolor: #f6f5f5;
  padding: 30px;

  @media (max-width: 900px) {
    padding: 0px;
  }
`;

export const InfoCell = styled(TableCell)``;
export const CustomTableBody = styled(TableBody)`
  &.MuiTableBody-root {
    .MuiTableCell-body {
      padding: 8px;
      font-weight: 400 !important;
    }
    ${CustomCell} {
      font-weight: 600 !important;
    }
    ${InfoCell} {
      &.MuiTableCell-root {
        padding: 0px;
        text-align: right;
        vertical-align: top;
        > p {
          padding: 10px;
          font-size: 18px;
        }
        > p:first-child {
          color: #0d9464;
          font-weight: 500;
          font-size: 22px;
          border-bottom: 2px dashed black;
        }
      }
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
  padding: 30px 0px 5px;
  margin-left: 30px;
  text-align: right;
  @media (max-width: 900px) {
    margin-left: 0px;
  }
  > p {
    padding-bottom: 10px;
  }
  > p:last-child {
    border-bottom: 1px dashed black;
    flex: 1;
  }
`;
