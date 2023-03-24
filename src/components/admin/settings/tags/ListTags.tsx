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
import { $imageApi } from "../../../../api";
import { useGetTagsQuery } from "../../../../store/tags-rtk/tagEndpoints";

export default function ListTags() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTagsQuery("");

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell align="center">Значение</TableCell>
              <TableCell align="center">Картина</TableCell>
              <TableCell align="center">Тип</TableCell>
              <TableCell align="right">Действие</TableCell>
            </TableRow>
          </TableHead>
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
            data?.map((row) => (
              <TableBody key={row.id}>
                <TableRow
                  key={row.id}
                  onClick={() => navigate(`/app/settings/tags/${row.id}`)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{row.id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={`${$imageApi}/${row.image}`}
                      alt="notFound"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.type}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <ArrowForwardIosRoundedIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
