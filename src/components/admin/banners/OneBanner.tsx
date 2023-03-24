import { useParams } from "react-router-dom";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import OrderAccordion from "../accordions/OrderAccordion";
import { useGetBannersQuery } from "../../../store/banner-rtk/bannerEndpoints";
import { $imageApi } from "../../../api";

const OneBanner = () => {
  const params = useParams();
  const { bannerId } = params;
  const { data, isLoading } = useGetBannersQuery("");


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
            direction={"column"}
            spacing={5}
            gridAutoRows="1fr"
            sx={{ width: "100%", mt: "15px", padding: "15px" }}
          >
            {data?.map((banner) => (
              <Grid item xs key={banner.id}>
                <Stack direction={"row"} spacing={3}>
                  <Typography>{banner.id}</Typography>
                  <Typography>{banner.type}</Typography>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                    src={`${$imageApi}/${banner.image}`}
                    alt="notFound"
                  />
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                    src={`${$imageApi}/${banner.mobile_image}`}
                    alt="notFound"
                  />
                  <Typography>{banner.createdAt}</Typography>
                  <Typography>{banner.deadline}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Paper>Нет Заказов</Paper>
      )}
    </>
  );
};

export default OneBanner;
