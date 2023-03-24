import { Box, Button, Paper, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ListApplication from "../../components/admin/shops/application/ListApplication";
import CreateShop from "../../components/admin/shops/CreateShop";
import OneShop from "../../components/admin/shops/OneShop";
import ShopsTable from "../../components/admin/shops/ShopsTable";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";
// import ShopsTable from "../../components/admin/shops/ShopsTable";

export default function Shops() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box>
        <Box mb={2} sx={{ display: "flex", flexDirection: "column" }}>
          <StyledHeaderTypography>Магазины</StyledHeaderTypography>
          {location.pathname === "/app/shops/list" && (
            <Button
              variant="contained"
              onClick={() => navigate("/app/shops/create")}
              sx={{ width: "175px" }}
            >
              Создать Магазин
            </Button>
          )}
          {location.pathname === "/app/shops/list" && (
            <Button
              variant="contained"
              onClick={() => navigate("/app/shops/application/list")}
              sx={{ width: "175px", mt: "10px" }}
            >
              Заявки
            </Button>
          )}
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
        </Box>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Paper sx={{ padding: "15px" }}>
            <Routes>
              <Route path="list" element={<ShopsTable />} />
              <Route path="one/:shopId" element={<OneShop />} />
              <Route path="create" element={<CreateShop />} />

              <Route path="application/list" element={<ListApplication />} />

              <Route path="*" element={<Navigate to="list" />} />
            </Routes>
          </Paper>
        </Suspense>
      </Box>
    </>
  );
}
