import {
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
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../store/order-rtk/orderEndpoints";

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
  id: "Артикул",
  totalPrice: "Общая сумма",
  status: "Статус",
};

const ShopOrdersTable: React.FC = () => {
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

  const navigate = useNavigate();
  const params = useParams();
  const { shopId } = params;
  const [status, setStatus] = useState("success");

  const [query, setQuery] = React.useState({
    shopId: shopId,
  });

  const { data, isLoading } = useGetAllOrdersQuery({
    ...query,
    page: page + 1,
    limit: rowsPerPage,
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

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
      ) : data ? (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
            Список Заказов
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
                {data?.orders.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.totalPrice}</StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={
                          row?.shopOrders[0]?.status === "CREATED"
                            ? "CREATED"
                            : row?.shopOrders[0]?.status === "PAYMENT"
                            ? "PAYMENT"
                            : row?.shopOrders[0]?.status === "SUCCESS"
                            ? "SUCCESS"
                            : row?.shopOrders[0]?.status === "CANCELLED"
                            ? "CANCELLED"
                            : "ERROR"
                        }
                        color={
                          row?.shopOrders[0]?.status === "CREATED"
                            ? "default"
                            : row?.shopOrders[0]?.status === "PAYMENT"
                            ? "secondary"
                            : row?.shopOrders[0]?.status === "SUCCESS"
                            ? "success"
                            : row?.shopOrders[0]?.status === "CANCELLED"
                            ? "primary"
                            : "error" //ENUM = ERROR
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/app/orders/one/${row.id}`)}
                        sx={{ borderWidth: "2px", fontWeight: 600 }}
                      >
                        Изменить
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
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
      ) : (
        <Typography>Нет Заказов</Typography>
      )}
    </>
  );
};

export default ShopOrdersTable;
