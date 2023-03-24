// library
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";

// hooks
import { useTypedSelector } from "../../hook/useTypedSelector";
// enum
import { ActionsEnum } from "../../store/enum";
// yupSchema

// store
import { login } from "../../store/reducers/auth/auth.action";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, error, status } = useTypedSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "", // Dias@gmail.com
      password: "", // 12345
    },
    onSubmit: async (values) => {
      dispatch(login(values));
    },
    // validationSchema: loginSchema,
  });

  React.useEffect(() => {
    if (isAuth) {
      navigate("/app", { replace: true });
    }
  }, [isAuth]);

  const { values, touched, errors, handleChange, handleSubmit } = formik;
  const { email, password } = values;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        ADU Admin
      </Typography>
      <Typography variant="h5" gutterBottom>
        Войдите чтобы продолжить!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {touched.email && errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="standard"
          value={password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          color="primary"
          size="large"
          disabled={status === ActionsEnum.LOADING}
        >
          Войти
        </Button>
        {error && (
          <Typography variant="caption" gutterBottom>
            Возникла ошибка. Попробуйте позже!
          </Typography>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
