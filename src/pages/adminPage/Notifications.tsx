import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CreateNotification from "../../components/admin/notifications/CreateNotification";
import NotificationsTable from "../../components/admin/notifications/NotificationsTable";
import OneNotification from "../../components/admin/notifications/OneNotification";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";

export default function Notifications() {
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
          <StyledHeaderTypography>Уведомление</StyledHeaderTypography>
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
        {location.pathname !== "/app/notifications/create" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/notifications/create")}
            sx={{ width: "140px", height: "60px" }}
          >
            Создать Уведомление
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper sx={{ p: "15px" }}>
          <Routes>
            <Route path="list" element={<NotificationsTable />} />
            <Route path="one/:notificationId" element={<OneNotification />} />
            <Route path="create" element={<CreateNotification />} />

            <Route path="*" element={<Navigate to="list" />} />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  );
}
