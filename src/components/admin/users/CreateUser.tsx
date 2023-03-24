import { Button, Grid, Typography } from "@mui/material";
import { useCreateUserMutation } from "../../../store/user-rtk/userEndpoints";
import { StyledAdminInput } from "../../styled-components/StyledInput";
import { useFormik } from "formik";
import { ICreateUser } from "../../../types/IUser";

export default function CreateUser() {
  const [create, { isLoading: createLoading, isSuccess: createSuccess }] =
    useCreateUserMutation();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },

    onSubmit: (values) => {
      create(values as ICreateUser);
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
    <Grid container columns={6}>
      <Grid item xs={3}>
        <Typography variant="h5" sx={{ mb: "15px" }}>
          Создать Пользователя
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledAdminInput
            sx={{ mb: "15px" }}
            placeholder="Введите имя"
            name="firstName"
            label="Введите имя"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            helperText={
              touched.firstName && errors.firstName && errors.firstName
            }
          />
          <StyledAdminInput
            sx={{ mb: "15px" }}
            placeholder="Введите фамилию"
            name="lastName"
            label="Введите фамилию"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            helperText={touched.lastName && errors.lastName && errors.lastName}
          />
          <StyledAdminInput
            sx={{ mb: "15px" }}
            placeholder="Почта"
            name="email"
            label="Почта"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            helperText={touched.email && errors.email && errors.email}
          />
          <StyledAdminInput
            sx={{ mb: "15px" }}
            type={"password"}
            placeholder="Пароль"
            name="password"
            label="Пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            helperText={touched.password && errors.password && errors.password}
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
            Создать Пользователя
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
