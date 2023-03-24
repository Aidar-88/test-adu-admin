// library
import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { StyledContainedButton } from "../../../../styled-components/StyledButton";
import { StyledAdminInput } from "../../../../styled-components/StyledInput";

// store
import { useDeleteCategoryMutation } from "../../../../../store/category-rtk/categoryEndpoints";

// types
import { IDeleteCategory } from "../../../../../types/ICategory";

export default function DeleteCategory() {
  // navigate
  const navigate = useNavigate();

  // state
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState("");

  // rtk
  const [remove, { isLoading, isSuccess, isError, reset }] =
    useDeleteCategoryMutation();

  const formik = useFormik({
    initialValues: { id: "" },

    onSubmit: (values) => {
      setSelectedValue(values.id);
      remove(values as IDeleteCategory).then((res) =>
        // @ts-ignore
        setCreatedId(res.data.id)
      );
    },
  });

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  const refreshForm = () => {
    formik.resetForm();
    reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <Grid container spacing={3} sx={{ width: "50%", mb: "20px" }}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="ID"
            label="ID"
            name="id"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={values.id}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Box
            sx={{ width: "110px", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert variant="outlined" severity="error" sx={{ mt: "15px" }}>
            Ошибка!
          </Alert>
        ) : isSuccess ? (
          <>
            <Box
              sx={{
                p: "5px",
                mt: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Alert
                variant="outlined"
                severity="success"
                sx={{ mt: "15px", mr: "10px" }}
              >
                <Typography>{selectedValue}</Typography>
                Успешно Удалено!
              </Alert>
              <StyledContainedButton
                disabled={isValid && !dirty}
                onClick={refreshForm}
                sx={{ mt: 2, mr: "10px" }}
              >
                Удалить еще раз
              </StyledContainedButton>
            </Box>
          </>
        ) : (
          <StyledContainedButton
            disabled={isValid && !dirty}
            type="submit"
            sx={{ mt: "15px" }}
          >
            Удалить
          </StyledContainedButton>
        )}
      </Box>
    </form>
  );
}
