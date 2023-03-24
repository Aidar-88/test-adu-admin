import { useParams } from "react-router-dom";
import {
  Button,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useConfirmProductMutation,
  useGetOneProductQuery,
} from "../../../store/product-rtk/productEndpoints";
import ImageSlider from "../swiper/ImageSlider";
import FormProduct from "./FormProduct";

const StyledSubHeader = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 700,
  marginTop: "15px",
}));

const OneShop = () => {
  const params = useParams();
  const { productId } = params;
  const { data, isLoading } = useGetOneProductQuery(productId ? productId : "");
  const [confirm, { data: response, isLoading: confirmLoading }] =
    useConfirmProductMutation();

  const handleConfirm = () => {
    data?.product && confirm({ productId: data?.product.id, confirm: true });
  };

  const handleCancel = () => {
    data?.product && confirm({ productId: data?.product.id, confirm: false });
  };

  console.log(data?.product.photos);

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
        <>
          <Grid
            container
            columns={6}
            spacing={3}
            gridAutoColumns="1fr"
            sx={{ justifyContent: "space-between", marginBottom: "30px" }}
          >
            <Grid item xs={2}>
              <Stack>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "20px", mb: "20px" }}
                >
                  {data.product.title}
                </Typography>
                <ImageSlider photos={data.product.photos} />
              </Stack>
            </Grid>
            <Grid
              xs={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Chip
                  label={
                    data.product.confirm ? "Подтверждено" : "Не Подтверждено"
                  }
                  color={data.product.confirm ? "success" : "error"}
                  sx={{ mt: "20px", mb: "20px", width: "155px" }}
                />
                <Button
                  variant="contained"
                  color={`${data.product.confirm ? "error" : "success"}`}
                  onClick={data.product.confirm ? handleCancel : handleConfirm}
                >
                  {data.product.confirm ? "Отказать" : "Подтверждить"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pl: "30px", mb: "30px" }}>
            <Grid item>
              <Stack>
                <StyledSubHeader>ID</StyledSubHeader>
                <Typography>{data.product.id}</Typography>
              </Stack>
            </Grid>
            {data.product.specs?.map((spec) => (
              <Grid item>
                <Stack>
                  <StyledSubHeader>{spec?.title.title}</StyledSubHeader>
                  <Typography>{spec.value}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Paper
            elevation={2}
            sx={{
              borderRadius: "15px",
              padding: "30px",
            }}
          >
            <FormProduct />
          </Paper>
        </>
      ) : (
        <Paper>Нет Продуктов</Paper>
      )}
    </>
  );
};

export default OneShop;
