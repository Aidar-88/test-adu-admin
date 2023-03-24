import {
  Box,
  Button,
  Chip,
  Paper,
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { $imageApi } from "../../../api";
import { useGetShopProductsQuery } from "../../../store/product-rtk/productEndpoints";
import { useGetOneShopQuery } from "../../../store/shop-rtk/shopEndpoints";
import AlertDialog from "../dialogs/AlertDialog";
import OneFilter from "../filters/OneFilter";

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
  img: "Картинка",
  title: "Название",
  price: "Цена",
  sells: "Продажи",
  confirm: "Подтверждение",
};

interface Props {
  setQuery?: (values: any) => void;
  shopId?: any;
  shopTitle?: string | undefined;

  forTag?: boolean;
  tagDelete?: boolean;
  handleProductClick?: (value: any) => void;
  handleTagDelete?: (id: number) => void;
}

const ProductsTable: React.FC<Props> = ({
  forTag,
  tagDelete,
  handleProductClick,
  handleTagDelete,
}) => {
  const params = useParams();
  const { shopId } = params;
  const { tagId } = params;
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data: shopData } = useGetOneShopQuery(shopId ? shopId : "");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [query, setQuery] = React.useState({
    shopId: shopId ? shopId : "",
    tagId: forTag ? "" : tagId,
    search: "",
    priceFrom: "",
    priceTo: "",
    category: "",
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

  const handleConfirm = (id: number) => {
    if (handleTagDelete) {
      handleTagDelete(id);
    }
  };

  const { data, isLoading } = useGetShopProductsQuery(
    { ...query, page: page + 1, limit: rowsPerPage },
    { refetchOnMountOrArgChange: true }
  );

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
            Список Продуктов
          </Typography>
          <TableContainer>
            {forTag ? (
              <OneFilter setQuery={(values) => handleChangeQuery(values)} />
            ) : (
              <OneFilter
                setQuery={(values) => handleChangeQuery(values)}
                shopId={shopId ? shopId : ""}
                tagId={tagId ? tagId : ""}
              />
            )}
            {data.count === 0 ? (
              <Box alignItems={"center"} sx={{ p: "10px" }}>
                <Paper
                  elevation={3}
                  sx={{
                    mt: "5px",
                    width: "100%",
                    height: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "35px",
                  }}
                >
                  Нет Продуктов
                </Paper>
              </Box>
            ) : (
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
                  {data?.products.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          src={`${$imageApi}/${row.image}`}
                          alt="notFound"
                        />
                      </StyledTableCell>
                      <StyledTableCell>{row.title}</StyledTableCell>
                      <StyledTableCell>{row.price}</StyledTableCell>
                      <StyledTableCell>{row.sells}</StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          label={
                            row.confirm ? "Подтверждено" : "Не Подтверждено"
                          }
                          color={row.confirm ? "success" : "error"}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          onClick={() =>
                            forTag && handleProductClick
                              ? handleProductClick(row.id)
                              : navigate(`/app/products/one/${row.id}`)
                          }
                          variant="outlined"
                          color="primary"
                          sx={{
                            width: "115px",
                            borderWidth: "2px",
                            fontWeight: 600,
                            mr: "5px",
                            mb: tagDelete ? "5px" : 0,
                          }}
                        >
                          {forTag ? "Выбрать" : "Изменить"}
                        </Button>
                        {tagDelete && handleTagDelete && (
                          <AlertDialog
                            title="Удалить"
                            header={"Удалить товар?"}
                            handleConfirm={(id: number) => handleConfirm(id)}
                            id={row.id}
                            isRed={false}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
        "Ошибка при загрузке, Перезагрузите страницу"
      )}
    </>
  );
};

export default ProductsTable;
