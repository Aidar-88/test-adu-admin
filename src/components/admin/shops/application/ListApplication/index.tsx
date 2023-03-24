import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router";
import { useGetApplicationQuery } from "../../../../../store/shop-rtk/shopEndpoints";
import ApplicationButtons from "./ApplicationButtons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: '#E1E1E1',
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
  id: "iD",
  name: "Название",
  phone: "Номер",
  contact_person: "Контакт Персон",
};

const ListApplication: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = useGetApplicationQuery("");

  return (
    <>
      {isLoading ? (
        <Typography
          width={"100%"}
          height={"50vh"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
          }}
        >
          Загрузка...
        </Typography>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
            Список Магазинов
          </Typography>
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
                  <StyledTableCell align={"left"}>Действие</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.title}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                    <StyledTableCell>{row.contact_person}</StyledTableCell>
                    {/* <StyledTableCell>
                      <Chip
                        variant="filled"
                        label={row.confirm ? "Подтверждено" : "Не Подтвреждено"}
                        color={row.confirm ? "success" : "error"}
                        sx={{ borderWidth: "2px", fontWeight: 600 }}
                        // onClick={() => navigate(`/app/shops/one/${row.id}`)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        variant="filled"
                        label={row.block ? "Заблокирован" : "Не Заблокирован"}
                        color={row.block ? "error" : "default"}
                        sx={{ borderWidth: "2px", fontWeight: 600 }}
                        // onClick={() => navigate(`/app/shops/one/${row.id}`)}
                      />
                    </StyledTableCell> */}
                    <StyledTableCell>
                      <ApplicationButtons applicationId={row.id} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default ListApplication;
