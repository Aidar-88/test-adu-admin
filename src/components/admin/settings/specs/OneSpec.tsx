import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useAddValueSpecMutation,
  useGetOneSpecQuery,
} from "../../../../store/spec-rtk/specEndpoints";
import { StyledContainedButton } from "../../../styled-components/StyledButton";
import AlertDialog from "../../dialogs/AlertDialog";
import React from "react";
import { AddValueForm, AddCategoryForm } from "./AddForm";
import DialogSpec from "./DialogSpec";

const OneSpec = () => {
  const params = useParams();
  const { specId } = params;
  const { data: spec, isLoading } = useGetOneSpecQuery(specId ? specId : "");
  const [addValue, { isLoading: addValueLoading }] = useAddValueSpecMutation();

  const handleConfirm = (confirm: boolean, value: string) => {
    if (confirm) {
      addValue({ titleId: parseInt(specId!), value: value });
    }
  };

  return (
    <Box>
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
      ) : spec ? (
        <Box>
          <Stack>
            <Typography>ID: {spec.id}</Typography>
            <Typography sx={{ mb: "30px" }}>Название: {spec.title}</Typography>
          </Stack>
          {spec.values && (
            <Grid container columns={6} direction={"row"} spacing={3}>
              <Grid item xs={3}>
                <Stack
                  direction={"row"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography sx={{ fontSize: "25px", mb: "10px" }}>
                    Значение
                  </Typography>

                  <DialogSpec title={spec.title} specId={spec.id} />
                </Stack>
                {spec.values.map((value) => (
                  <Paper
                    elevation={2}
                    sx={{ p: "15px", mb: "10px" }}
                    key={value.id}
                  >
                    <Typography>ID: {value.id}</Typography>
                    <Typography>Значение: {value.value}</Typography>
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Stack
                  direction={"row"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography sx={{ fontSize: "25px", mb: "10px" }}>
                    Категорий
                  </Typography>
                  <DialogSpec
                    title={spec.title}
                    specId={spec.id}
                    forCategory={true}
                  />
                </Stack>
                {spec.categories.map((category) => (
                  <Paper
                    elevation={2}
                    sx={{ p: "15px", mb: "10px" }}
                    key={category.id}
                  >
                    <Typography>ID: {category.id}</Typography>
                    <Typography>Значение: {category.name}</Typography>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Typography>Что то пошло не так</Typography>
      )}
    </Box>
  );
};

export default OneSpec;
