import {
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useCreateShopMutation } from "../../../store/shop-rtk/shopEndpoints";
import { ICreateNewShop } from "../../../types/IShop";
import { StyledAdminInput } from "../../styled-components/StyledInput";

const CreateShop = () => {
  const [update] = useCreateShopMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      company: "",
      bin: "",
      address: "",
      email: "",
      phone: "",
      instagram: "",
    },

    onSubmit: (values) => {
      // update(values as ICreateNewShop);
    },
  });

  const {
    values,
    isValid,
    errors,
    touched,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  return (
    <>
      <Grid container columns={6}>
        <Grid item xs={3}>
          <Typography variant="h5">Добавить магазин</Typography>

          <form>
            <Typography gutterBottom variant="caption">
              Контактное лицо
            </Typography>
            <StyledAdminInput
              placeholder="Введите ваше имя"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={
                touched.firstName && errors.firstName && errors.firstName
              }
            />
            <Typography gutterBottom variant="caption">
              Название компании
            </Typography>
            <StyledAdminInput
              placeholder="Название компании"
              name="company"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={touched.company && errors.company && errors.company}
            />
            <Typography gutterBottom variant="caption">
              БИН/ИИН
            </Typography>
            <StyledAdminInput
              placeholder="БИН/ИИН"
              name="bin"
              value={values.bin}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={touched.bin && errors.bin && errors.bin}
            />
            <Typography gutterBottom variant="caption">
              Адрес
            </Typography>
            <StyledAdminInput
              placeholder="Адрес"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={touched.address && errors.address && errors.address}
            />
            <Typography gutterBottom variant="caption">
              Введите ваш email
            </Typography>
            <StyledAdminInput
              placeholder="Введите ваш email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={touched.email && errors.email && errors.email}
            />
            <Typography gutterBottom variant="caption">
              Введите ваш телефон
            </Typography>
            <StyledAdminInput
              placeholder="Введите ваш телефон"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helperText={touched.phone && errors.phone && errors.phone}
            />
            <Typography gutterBottom variant="caption">
              Введите ваш логин инстаграма
            </Typography>
            <StyledAdminInput
              placeholder="Введите ваш логин инстаграма"
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.instagram && errors.instagram && errors.instagram
              }
            />
            <Button
              disabled={isValid && !dirty}
              type="submit"
              variant="contained"
              sx={{
                marginTop: "2rem !important",
                height: "40px",
                // background: "#BBBBBB",
                borderRadius: "10px",
                fontSize: ".7rem",
                color: "#fff",
                "&:hover": {
                  background: "#8A3FFC",
                },
              }}
            >
              Оставить заявку
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateShop;
