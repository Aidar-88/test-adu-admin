import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useCreateRoleMutation } from "../../../../store/role-rtk/roleEndpoints";
import { ICreateRole } from "../../../../types/IRole";
import { StyledContainedButton } from "../../../styled-components/StyledButton";
import { StyledAdminInput } from "../../../styled-components/StyledInput";

export default function CreateRole() {
  const [create, { isSuccess, isError, isLoading }] = useCreateRoleMutation();

  const formik = useFormik({
    initialValues: { value: "", description: "" },

    onSubmit: (values) => {
      console.log(values);
      create(values as ICreateRole);
    },
  });

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ width: "50%" }}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Значение"
            label="Значение"
            name="value"
            onChange={handleChange}
            value={values.value}
          />
          <StyledAdminInput
            placeholder="Описание"
            label="Описание"
            name="description"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.description}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pt: "25px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{ width: "110px", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert variant="outlined" severity="error">
            Ошибка!
          </Alert>
        ) : isSuccess ? (
          <Alert variant="outlined" severity="success">
            Успешно Добавлено!
          </Alert>
        ) : (
          <StyledContainedButton disabled={isValid && !dirty} type="submit">
            Добавить
          </StyledContainedButton>
        )}
      </Box>
    </form>
  );
}
