import { Box, Button, Paper, Typography } from "@mui/material";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProductsTable from "../../components/admin/products/ProductsTable";
import OneProduct from "../../components/admin/products/OneProduct";
import { StyledHeaderTypography } from "../../components/styled-components/StyledTypography";
import CreateProduct from "../../components/admin/products/CreateProduct";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box>
        <Box mb={2} sx={{ display: "flex", flexDirection: "column" }}>
          <StyledHeaderTypography>Продукты</StyledHeaderTypography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {location.pathname !== "/app/shops/list" && (
              <Button
                variant="contained"
                onClick={goBack}
                sx={{ width: "100px" }}
              >
                Назад
              </Button>
            )}
            {location.pathname === "/app/products/list" && (
              <Button
                variant="contained"
                onClick={() => navigate("/app/products/create")}
                sx={{ width: "175px" }}
              >
                Создать Продукт
              </Button>
            )}
          </Box>
        </Box>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Paper sx={{ padding: "15px" }}>
            <Routes>
              <Route path="list" element={<ProductsTable />} />
              <Route path="list/:shopId" element={<ProductsTable />} />
              <Route path="one/:productId" element={<OneProduct />} />
              <Route path="create" element={<CreateProduct />} />

              <Route path="*" element={<Navigate to="list" />} />
            </Routes>
          </Paper>
        </Suspense>
      </Box>
    </>
  );
}
