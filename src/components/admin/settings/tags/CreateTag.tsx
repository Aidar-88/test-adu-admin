import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTagMutation } from "../../../../store/tags-rtk/tagEndpoints";
import { ICreateNewTag } from "../../../../types/ITag";
import { StyledContainedButton } from "../../../styled-components/StyledButton";

export default function CreateTag() {
  const [tag, setTag] = React.useState<ICreateNewTag>({
    name: null,
    file: null,
    type: null,
  });
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [create, { isLoading, isSuccess, isError }] = useCreateTagMutation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (createdId) {
      navigate(`/app/settings/tags/${createdId}`);
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    setTag((state) => ({ ...state, file: file }));
  };

  const handleChange = (e: any, type: "name" | "type") => {
    if (type === "name") {
      setTag((state) => ({ ...state, name: e.target.value }));
    } else if (type === "type") {
      setTag((state) => ({ ...state, type: e.target.value }));
    }
  };

  const handleSubmit = () => {
    const { name, type, file } = tag;
    const formData = new FormData();

    if (name !== null) {
      formData.append("name", String(name));
    }
    if (type !== null) {
      formData.append("type", String(type));
    }
    if (file !== null) {
      formData.append("file", file);
    }

    create(formData);
  };

  const refreshForm = () => {};

  return (
    <form onSubmit={handleSubmit} style={{ paddingBottom: "10px" }}>
      <Grid container spacing={3} sx={{ width: "50%", mb: "20px" }}>
        <Grid item xs>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <TextField
              label="Значение"
              onChange={(e) => handleChange(e, "name")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tag.type}
              label="Type"
              onChange={(e) => handleChange(e, "type")}
            >
              <MenuItem value={"FILTER"}>FILTER</MenuItem>
              <MenuItem value={"PROMOTION"}>PROMOTION</MenuItem>
            </Select>
          </FormControl>
          <Stack sx={{ mb: "20px" }}>
            <label>Desktop version</label>
            <input type="file" onChange={(e) => handleAddImage(e)} />
          </Stack>
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
            <Alert variant="outlined" severity="success" sx={{ mt: "15px" }}>
              Успешно Добавлено!
            </Alert>
            <StyledContainedButton
              onClick={refreshForm}
              sx={{ mt: 2, mr: "10px" }}
            >
              Добавить Новый
            </StyledContainedButton>
            {createdId && (
              <StyledContainedButton sx={{ mt: 2 }} onClick={handleNavigate}>
                {`Перейти на ${selectedValue}`}
              </StyledContainedButton>
            )}
          </>
        ) : (
          <StyledContainedButton onClick={handleSubmit} sx={{ mt: 2 }}>
            Добавить
          </StyledContainedButton>
        )}
      </Box>
    </form>
  );
}
