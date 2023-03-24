import {
  Box,
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
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { $imageApi } from "../../../api";
import { useGetAllUsersQuery } from "../../../store/user-rtk/userEndpoints";
import { useState } from "react";
import OneFilter from "../filters/OneFilter";

export default function ListUsers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [query, setQuery] = useState({
    search: "",
  });

  const handleChangeQuery = (values: object) => {
    setQuery((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    setPage(0);
  };

  const { data, isLoading } = useGetAllUsersQuery(
    { ...query, page: page + 1, limit: rowsPerPage },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);

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

  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
        Список Пользователей
      </Typography>
      <TableContainer component={Box}>
        <OneFilter
          setQuery={(values) => handleChangeQuery(values)}
          forUsers={true}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              {/* <StyledTableCell>Артикул</StyledTableCell> */}
              <StyledTableCell align="left">Картинка</StyledTableCell>
              <StyledTableCell align="left">Почта</StyledTableCell>
              <StyledTableCell align="left">Номер</StyledTableCell>
              <StyledTableCell align="left">Имя</StyledTableCell>
              <StyledTableCell align="left">Фамилия</StyledTableCell>
              <StyledTableCell align="center">Действие</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <StyledTableRow>
                <StyledTableCell align="center">Загрузка...</StyledTableCell>
              </StyledTableRow>
            ) : (
              data?.users.map((user) => (
                <StyledTableRow
                  key={user.id}
                  onClick={() => navigate(`/app/users/one/${user.id}`)}
                >
                  {/* <StyledTableCell align="center" component="th" scope="row">
                    <div>{user.id}</div>
                  </StyledTableCell> */}

                  <StyledTableCell align="center">
                    {user.avatar === null ? (
                      <AccountCircleOutlinedIcon />
                    ) : (
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                        src={`${$imageApi}/${user.avatar}`}
                        alt="notFound"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div>{user.email}</div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div>{user.phone}</div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div>{user.firstName}</div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div>{user.lastName}</div>
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">
                    <div>
                      {user?.roles.length === 0 ? (
                        "Нет Роли"
                      ) : (
                        <div>
                          {user?.roles?.map((role) => (
                            <div key={role.id}>{role.value}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    <div>
                      <ArrowForwardIosRoundedIcon />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Товаров на одной странице:"
        />
      </TableContainer>
    </Box>
  );
}
