import { Box, Button, Paper, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import OneOrder from "../../components/admin/orders/OneOrder";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";

export default function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box mb={2} sx={{ display: "flex", flexDirection: "column" }}>
        <StyledHeaderTypography>Заказы</StyledHeaderTypography>
        {location.pathname !== "/app/shops/list" ? (
          <Button variant="contained" onClick={goBack} sx={{ width: "100px" }}>
            Назад
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper
          elevation={location.pathname === "/app/orders/list" ? 1 : 0}
          sx={{ padding: "15px" }}
        >
          <Routes>
            <Route path="list" element={<OrdersTable />} />
            {/* <Route path="list/:shopId" element={<ShopOrdersTable />} /> */}
            <Route path="one/:orderId" element={<OneOrder />} />

            <Route path="*" element={<Navigate to="list" />} />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  );
}
