import styled from "styled-components";
import TableCell from "@mui/material/TableCell";

export const Header = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;
export const formInputsDiv = styled.div`
  display: flex;
`;
export const LogoDiv = styled.div`
  height: 50px;

  background: #e8e9dc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CompanyTitle = styled.div`
  text-align: center;
  flex: 1;
  h2 {
    color: #0d9464;
  }
`;
export const CustomCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 8px;
  }
`;
export const SearchDiv = styled.div`
  width: 100%;
`;
export const searchInput = styled.input`
placeholder="ابحث عن اسم";
width: 60%;
                  padding: 5px;
                  textAlign: right;
                  border: "none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px gary;
  }
`;
