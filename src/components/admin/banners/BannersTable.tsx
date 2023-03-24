import {
  Box,
  Button,
  CircularProgress,
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
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { $imageApi } from "../../../api";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../../store/banner-rtk/bannerEndpoints";
import { IDeleteBanner } from "../../../types/IBanner";
import AlertDialog from "../dialogs/AlertDialog";

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
  type: "Тип",
  image: "Десктоп картинка",
  mobile_image: "Мобильная картинка",
  createdAt: "Создано",
  deadline: "Дедлайн",
};

const BannersTable: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBannersQuery("");
  const [deleteBanner, { isLoading: deleteLoading, isError, isSuccess }] =
    useDeleteBannerMutation();
  const handleConfirm = (bannerId: number) => {
    deleteBanner(bannerId);
  };

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
        data.length === 0 ? (
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
            <Typography sx={{ fontSize: "27px" }}>Нет Баннеров</Typography>
          </Paper>
        ) : (
          <Box sx={{ p: "15px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
              Список Баннеров
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
                  {data?.map((banner) => (
                    <StyledTableRow key={banner.id}>
                      <StyledTableCell>{banner.id}</StyledTableCell>
                      <StyledTableCell>{banner.type}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          src={`${$imageApi}/${banner.image}`}
                          alt="notFound"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          src={`${$imageApi}/${banner.mobile_image}`}
                          alt="notFound"
                        />
                      </StyledTableCell>
                      <StyledTableCell>{banner.createdAt}</StyledTableCell>
                      <StyledTableCell>{banner.deadline}</StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ width: "115px" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              navigate(`/app/banners/one/${banner.id}`)
                            }
                            sx={{
                              mb: "5px",
                              borderWidth: "2px",
                              width: "100%",
                            }}
                          >
                            Изменить
                          </Button>
                          {deleteLoading ? (
                            <Box
                              sx={{
                                width: "110px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CircularProgress />
                            </Box>
                          ) : isError ? (
                            <>Ошибка</>
                          ) : isSuccess ? (
                            <>Успешно Удалено</>
                          ) : (
                            <AlertDialog
                              title={`Удалить`}
                              header={"Вы точно хотите удалить баннер?"}
                              handleConfirm={(id: number) => handleConfirm(id)}
                              id={banner.id}
                              isRed={true}
                            />
                          )}
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )
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
          <Typography sx={{ fontSize: "27px" }}>Что то не так</Typography>
        </Paper>
      )}
    </>
  );
};

export default BannersTable;
