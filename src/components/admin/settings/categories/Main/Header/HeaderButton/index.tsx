// library
import { Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// styled-components
import {
  StyledActionButton,
  StyledDangerButton,
} from "../../../../../../styled-components/StyledButton";

// style

export default function HeaderButton() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack>
      {location.pathname !== "/app/settings/categories/list" && (
        <StyledActionButton
          sx={{ mb: "5px" }}
          onClick={() => navigate("/app/settings/categories/list")}
        >
          Список Категорий
        </StyledActionButton>
      )}
      {location.pathname !== "/app/settings/categories/create" && (
        <StyledActionButton
          sx={{ mb: "5px" }}
          onClick={() => navigate("/app/settings/categories/create")}
        >
          Добавление Категорий
        </StyledActionButton>
      )}
      {location.pathname !== "/app/settings/categories/delete" && (
        <StyledDangerButton
          onClick={() => navigate("/app/settings/categories/delete")}
        >
          Удаление Категорий
        </StyledDangerButton>
      )}
    </Stack>
  );
}
