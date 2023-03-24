import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCreateBannerMutation } from "../../../store/banner-rtk/bannerEndpoints";
import { useCreateNotificationMutation } from "../../../store/notification-rtk/notificationEndpoints";
import { ICreateNewBanner } from "../../../types/IBanner";
import { ICreateNewNotification } from "../../../types/INotification";
import { StyledAdminInput } from "../../styled-components/StyledInput";
import ImageContainer from "../image-input/ImageContainer";
import ImageInput from "../image-input/ImageInput";
import WebSock from "./WebSock";

const CreateNotification = () => {
  const [update] = useCreateNotificationMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      text: "",
    },

    onSubmit: (values) => {
      update(values as ICreateNewNotification);
    },
  });

  const { values, handleSubmit, setFieldValue, handleChange } = formik;

  return (
    <Grid container columns={6}>
      <Grid item xs={3} sx={{ p: "30px" }}>
        <Typography variant="h5">Создать Уведомление</Typography>
        <form>
          <Typography variant="caption" color="gray">
            УведомлениеТЕСТ
          </Typography>
          <StyledAdminInput
            placeholder="Название Уведомлений"
            label="Название товара"
            name="name"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.name}
          />
          <StyledAdminInput
            placeholder="Описание Уведомлений"
            label="Описание"
            name="text"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.text}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleSubmit()}
            sx={{ marginTop: "15px" }}
          >
            Создать
          </Button>
        </form>
      </Grid>
      <Grid item xs={3}>
        <WebSock />
      </Grid>
    </Grid>
  );
};

export default CreateNotification;
