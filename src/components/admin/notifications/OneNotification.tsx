import { useParams } from "react-router-dom";
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
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetOneOrderQuery } from "../../../store/order-rtk/orderEndpoints";
import OrderAccordion from "../accordions/OrderAccordion";

const OneNotification = () => {
  const params = useParams();
  const { orderId } = params;
  const { data, isLoading } = useGetOneOrderQuery(orderId ? orderId : "");

  console.log(data);

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
      ) : data?.shopOrders ? (
        <>
          <Grid
            container
            direction={"column"}
            spacing={5}
            gridAutoRows="1fr"
            sx={{ width: "100%" }}
          >
            {data.shopOrders.map((order) => (
              <Grid item xs key={order.id}>
                <OrderAccordion
                  order={order}
                  orderTotalPrice={data?.totalPrice}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Paper>Нет Уведомлений</Paper>
      )}
    </>
  );
};

export default OneNotification;
