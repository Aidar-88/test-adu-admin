import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import {
  useAddCategoryspecMutation,
  useAddValueSpecMutation,
} from "../../../../store/spec-rtk/specEndpoints";
import { IAddCategorySpec, IAddValueSpec } from "../../../../types/ISpec";
import { StyledContainedButton } from "../../../styled-components/StyledButton";
import { StyledAdminInput } from "../../../styled-components/StyledInput";

interface Props {
  specId: number;
}

export const AddValueForm: React.FC<Props> = ({ specId }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [addValue, { isLoading, isError, isSuccess }] =
    useAddValueSpecMutation();

  const formik = useFormik({
    initialValues: { titleId: specId, value: "" },

    onSubmit: (values) => {
      setSelectedValue(values.value);
      addValue(values as IAddValueSpec);
    },
  });

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Название Спецификации"
            label="Название Спецификации"
            name="titleId"
            sx={{ mt: "24px" }}
            onFocus={(e) => e.target.select()}
            disabled
            onChange={handleChange}
            value={specId}
          />
          <StyledAdminInput
            placeholder="Значение"
            label="Значение"
            name="value"
            autoFocus
            sx={{ mt: "24px" }}
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            value={values.value}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Box sx={{ width: "110px", display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ mt: "20px" }} />
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
              mt: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Alert variant="outlined" severity="success" sx={{ mr: "10px" }}>
              <Typography>{selectedValue}</Typography>
              Успешно Добавлено!
            </Alert>
            <StyledContainedButton disabled={isValid && !dirty} type="submit">
              Добавить Новый
            </StyledContainedButton>
          </Box>
        </>
      ) : (
        <StyledContainedButton
          disabled={isValid && !dirty}
          type="submit"
          sx={{ mt: "15px" }}
        >
          Добавить
        </StyledContainedButton>
      )}
    </form>
  );
};

export const AddCategoryForm: React.FC<Props> = ({ specId }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [addCategory, { isLoading, isError, isSuccess }] =
    useAddCategoryspecMutation();

  // const handleSetCategory = (categoryId: number, categoryName: string) => {
  //   setSelectedId(categoryId);
  //   setSelectedName(categoryName);
  // };
  const formik = useFormik({
    initialValues: { categoryId: 0, specId: specId },

    onSubmit: (values) => {
      setSelectedValue(values.categoryId);
      addCategory(values as IAddCategorySpec);
    },
  });

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Название Спецификации"
            label="Название Спецификации"
            name="titleId"
            sx={{ mt: "24px" }}
            onFocus={(e) => e.target.select()}
            disabled
            onChange={handleChange}
            value={specId}
          />
          <StyledAdminInput
            placeholder="Category ID"
            label="Category ID"
            name="categoryId"
            sx={{ mt: "24px" }}
            autoFocus
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            value={values.categoryId}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Box sx={{ width: "110px", display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ mt: "20px" }} />
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
              mt: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Alert variant="outlined" severity="success" sx={{ mr: "10px" }}>
              <Typography>{selectedValue}</Typography>
              Успешно Добавлено!
            </Alert>
            <StyledContainedButton disabled={isValid && !dirty} type="submit">
              Добавить Новый
            </StyledContainedButton>
          </Box>
        </>
      ) : (
        <StyledContainedButton
          disabled={isValid && !dirty}
          type="submit"
          sx={{ mt: "15px" }}
        >
          Добавить
        </StyledContainedButton>
      )}
    </form>
  );
};
