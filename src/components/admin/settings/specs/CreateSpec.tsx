import { Rowing } from "@mui/icons-material";
import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateSpecMutation,
  useGetSpecsQuery,
} from "../../../../store/spec-rtk/specEndpoints";
import { ICreateSpec } from "../../../../types/ISpec";
import { StyledContainedButton } from "../../../styled-components/StyledButton";
import { StyledAdminInput } from "../../../styled-components/StyledInput";

export default function CreateSpec() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [create, { isLoading, isSuccess, isError }] = useCreateSpecMutation();
  const [createdSpec, setCreatedSpec] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: { title: "" },

    onSubmit: (values) => {
      setSelectedValue(values.title);
      // @ts-ignore
      create(values as ICreateSpec).then((res) => setCreatedSpec(res.data.id));
    },
  });

  const [lastId, setLastId] = useState(0);
  const { data, isSuccess: specSuccess } = useGetSpecsQuery("");
  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  const handleNavigate = () => {
    if (createdSpec) {
      navigate(`/app/settings/specs/${createdSpec}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <Grid container spacing={3} sx={{ width: "50%", mb: "20px" }}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Значение"
            label="Значение"
            name="title"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={values.title}
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
                Успешно Добавлено!
              </Alert>
              <StyledContainedButton
                disabled={isValid && !dirty}
                type="submit"
                sx={{ mt: 2, mr: "10px" }}
              >
                Добавить Новый
              </StyledContainedButton>
              {createdSpec && (
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
