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
import { useGetRolesQuery } from "../../../../store/role-rtk/roleEndpoints";

export default function ListRoles() {
  const { data, isLoading } = useGetRolesQuery("");

  return (
    <Box>
      {isLoading ? (
        <Typography
          width={"100%"}
          height={"50vh"}
          component={"div"}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Артикул</TableCell>
                <TableCell align="right">Значение</TableCell>
                <TableCell align="right">Описание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{row.id}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{row.value}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{row.description}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
