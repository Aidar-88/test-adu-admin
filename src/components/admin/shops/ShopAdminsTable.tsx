import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router";
import { useGetShopsQuery } from "../../../store/shop-rtk/shopEndpoints";
import { IUser } from "../../../types/IUser";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#AAAAAA",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "transparent",
  borderTopColor: "#AAAAAA",
}));

const mapping = {
  id: "Артикул",
  name: "ФИО",
  phone: "Номер",
  email: "Почта",
};

interface Props {
  admins: IUser[];
}

const ShopAdminsTable: React.FC<Props> = ({ admins }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            {Object.values(mapping).map((title, idx) => {
              return (
                <StyledTableCell key={idx} align={"left"}>
                  {title}
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {admins?.map((admin) => (
            <StyledTableRow key={admin.id}>
              <StyledTableCell>{admin.id}</StyledTableCell>
              <StyledTableCell>
                {admin.firstName} {admin.lastName}
              </StyledTableCell>
              <StyledTableCell>{admin.phone}</StyledTableCell>
              <StyledTableCell>{admin.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShopAdminsTable;
