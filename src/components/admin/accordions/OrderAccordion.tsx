import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IShopOrders } from "../../../types/IOrder";
import { FC } from "react";
import { $imageApi } from "../../../api";

interface Props {
  order: IShopOrders;
  orderTotalPrice: number;
}

const OrderAccordion: FC<Props> = ({ order, orderTotalPrice }) => {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor:
            order.status === "CREATED"
              ? "#00000014"
              : order.status === "PAYMENT"
              ? "#9c27b0"
              : order.status === "SUCCESS"
              ? "#2e7d32"
              : order.status === "CANCELLED"
              ? "#1976d2"
              : "#d32f2f", //ENUM = ERROR
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Магазин: {order?.shop?.name}
          </Typography>
          <Stack>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                fontSize: "20px",
              }}
            >
              Создано: {order?.createdAt.slice(0, 10)}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                fontSize: "20px",
              }}
            >
              Итоговая Цена: {orderTotalPrice}
            </Typography>
          </Stack>
          <Paper
            elevation={4}
            sx={{
              mr: "15px",
              display: "flex",
              alignItems: "center",
              height: "35px",
            }}
          >
            <Chip
              label={order.status}
              sx={{
                width: "155px",
                backgroundColor: "#fff",
              }}
            />
          </Paper>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: "10px" }}>
        {order.products.length === 0 ? (
          <>Нет Продуктов</>
        ) : (
          order.products.map((product) => (
            <Paper sx={{ padding: "20px" }} elevation={5} key={product.id}>
              <Grid container columns={6}>
                <Grid item xs={2}>
                  <Typography>{product.product.title}</Typography>
                  <img
                    src={`${$imageApi}/${product.product.image}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography>Артикул: {product.product.id}</Typography>
                  <Typography>Цена: {product.product.price}</Typography>
                  <Typography>Скидка: {product.product.discount}%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Количество: {product.qty}</Typography>
                  <Typography>Итоговая Цена: {product.totalPrice}</Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
