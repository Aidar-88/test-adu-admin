import {
  Paper,
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
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetBannersQuery } from "../../../store/banner-rtk/bannerEndpoints";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#AAAAAA",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  background: "transparent",
  borderTopColor: "#AAAAAA",
}));

const mapping = {
  id: "Артикул",
  city: "Город",
};

const NotificationsTable: React.FC = () => {
  const params = useParams();
  const { shopId } = params;
  const { data, isLoading } = useGetBannersQuery("");

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
            Список Уведомлений
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
                <Typography>Нет Уведомлений</Typography>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Paper
          elevation={3}
          sx={{
            minHeight: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <Typography sx={{ fontSize: "27px" }}>Нет Уведомлений</Typography>
        </Paper>
      )}
    </>
  );
};

export default NotificationsTable;
