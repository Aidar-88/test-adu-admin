import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SettingsTable from "../../components/admin/settings/SettingsTable";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack>
          <StyledHeaderTypography>Настройки</StyledHeaderTypography>
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
      </Box>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper>
          <Routes>
            <Route path={"roles/*"} element={<SettingsTable />} />
            <Route path={"categories/*"} element={<SettingsTable />} />
            <Route
              path={"categories/:categoryId"}
              element={<SettingsTable />}
            />
            <Route path={"tags/*"} element={<SettingsTable />} />
            <Route path={"tags/:tagId"} element={<SettingsTable />} />
            <Route path={"specs/*"} element={<SettingsTable />} />
            <Route path={"specs/:specId"} element={<SettingsTable />} />
            <Route index element={<Navigate to="roles/list" />} />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  );
}
