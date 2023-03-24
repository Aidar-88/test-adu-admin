import { Box, Typography } from "@mui/material";
import { StyledContainedButton } from "../../styled-components/StyledButton";
import { StyledAdminInput } from "../../styled-components/StyledInput";

const CreateProduct = () => {
  return (
    <Box>
      <Typography sx={{ mb: "10px" }}>Создать Продукт</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <StyledAdminInput
          placeholder="Значение"
          label="Значение"
          name="value"
          sx={{ width: "200px", mb: "15px" }}
        />
        <StyledAdminInput
          placeholder="ID"
          label="ID"
          name="ID"
          sx={{ width: "200px", mb: "15px" }}
        />
        <StyledAdminInput
          placeholder="Категория"
          label="Категория"
          name="category"
          sx={{ width: "200px", mb: "15px" }}
        />
        <StyledAdminInput
          placeholder="Тэг"
          label="Тэг"
          name="tag"
          sx={{ width: "200px", mb: "15px" }}
        />
        <StyledContainedButton sx={{ width: "200px" }} type="submit">
          Добавить
        </StyledContainedButton>
      </Box>
    </Box>
  );
};

export default CreateProduct;
