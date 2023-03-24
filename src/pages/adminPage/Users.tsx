import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CreateUser from "../../components/admin/users/CreateUser";
import ListUsers from "../../components/admin/users/ListUsers";
import OneUser from "../../components/admin/users/OneUser";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";

export default function Users() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Stack>
          <StyledHeaderTypography>Пользователи</StyledHeaderTypography>
          {location.pathname !== "/app/shops/list" ? (
            <Button
              variant="contained"
              onClick={goBack}
              sx={{ width: "100px" }}
            >
              Назад
            </Button>
          ) : (
            ""
          )}
        </Stack>
        {location.pathname !== "/app/users/create" && (
          <Button
            variant="contained"
            onClick={() => navigate("/app/users/create")}
            sx={{ width: "175px", height: "50px" }}
          >
            Создать Пользователя
          </Button>
        )}
      </Box>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper elevation={1} sx={{ padding: "15px" }}>
          <Routes>
            <Route index element={<Navigate to="list" />} />
            <Route path={"list"} element={<ListUsers />} />
            <Route path={"one/:userId"} element={<OneUser />} />
            <Route path={"create"} element={<CreateUser />} />
            <Route path="*" element={<Navigate to="list" />} />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  );
}
