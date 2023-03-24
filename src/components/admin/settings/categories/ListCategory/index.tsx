import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useGetCategoriesQuery } from "../../../../../store/category-rtk/categoryEndpoints";

export default function ListCategories() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery("");

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell align="center">Значение</TableCell>
              <TableCell align="right">Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
              data?.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    navigate(
                      `/app/settings/categories/${row.id}?name=${row.name}`
                    )
                  }
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="right">
                    <ArrowForwardIosRoundedIcon />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
