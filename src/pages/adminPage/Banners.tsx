import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BannersTable from "../../components/admin/banners/BannersTable";
import CreateBanner from "../../components/admin/banners/CreateBanner";
import OneBanner from "../../components/admin/banners/OneBanner";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";

export default function Banners() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack>
          <StyledHeaderTypography>Баннеры</StyledHeaderTypography>
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
        {location.pathname === "/app/banners/list" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/banners/create")}
            sx={{ width: "100px" }}
          >
            Создать Баннер
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper>
          <Routes>
            <Route path="list" element={<BannersTable />} />
            <Route path="one/:bannerId" element={<OneBanner />} />
            <Route path="create" element={<CreateBanner />} />

            <Route path="*" element={<Navigate to="list" />} />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  );
}
