import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useField, useFormik, useFormikContext } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../../../store/category-rtk/categoryEndpoints";
import { ICreateCategory } from "../../../../../types/ICategory";
import { StyledContainedButton } from "../../../../styled-components/StyledButton";
import { StyledAdminInput } from "../../../../styled-components/StyledInput";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [create, { isLoading, isSuccess, isError, reset }] =
    useCreateCategoryMutation();

  const handleSelectChange = (event: SelectChangeEvent) => {
    formik.setFieldValue("type", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      parentCategoryId: "",
      sort: 0,
      type: "product",
    },

    onSubmit: (values) => {
      setSelectedValue(values.name);
      if (values.parentCategoryId !== "") {
        create(values as ICreateCategory).then((res) =>
          // @ts-ignore
          setCreatedId(res.data.id)
        );
      } else {
        create({
          name: values.name,
          sort: values.sort,
          type: values.type,
        } as ICreateCategory).then((res) =>
          // @ts-ignore
          setCreatedId(res.data.id)
        );
      }
      console.log(values);
    },
  });

  const handleNavigate = () => {
    if (createdId) {
      navigate(`/app/settings/categories/${createdId}`);
    }
  };

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  const refreshForm = () => {
    formik.resetForm();
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ width: "50%", mb: "20px" }}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Значение"
            label="Значение"
            name="name"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={values.name}
          />
          <StyledAdminInput
            placeholder="ParentID"
            label="ParentID"
            name="parentCategoryId"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={values.parentCategoryId}
          />
          <StyledAdminInput
            placeholder="0"
            label="Приоритет в списке"
            name="sort"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={values.sort}
          />

          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">
              Тип (Product || Service)
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.type}
              label="Тип (Product || Service)"
              onChange={handleSelectChange}
              onSelect={handleChange}
            >
              <MenuItem value={"product"}>Product</MenuItem>
              <MenuItem value={"service"}>Service</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
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
                Успешно Добавлено!
              </Alert>
              <StyledContainedButton
                disabled={isValid && !dirty}
                onClick={refreshForm}
                sx={{ mt: 2, mr: "10px" }}
              >
                Добавить Новый
              </StyledContainedButton>
              {createdId && (
                <StyledContainedButton
                  disabled={isValid && !dirty}
                  sx={{ mt: 2 }}
                  onClick={handleNavigate}
                >
                  {`Перейти на ${selectedValue}`}
                </StyledContainedButton>
              )}
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
      </Box>
    </form>
  );
}
