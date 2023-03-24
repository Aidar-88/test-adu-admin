import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRole from "./CreateRole";
import ListRoles from "./ListRoles";

export default function RolesTab() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography component={"div"} sx={{ fontSize: "25px", mb: "15px" }}>
          {location.pathname === "/app/settings/roles/create"
            ? "Добавление Роли"
            : "Роли"}
        </Typography>
        {location.pathname === "/app/settings/roles/create" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/roles/list")}
            sx={{ width: "160px", height: "37.5px", fontSize: "12px" }}
          >
            Список Ролей
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/roles/create")}
            sx={{ width: "160px", height: "37.5px", fontSize: "12px" }}
          >
            Добавление Роли
          </Button>
        )}
      </Stack>
      {location.pathname === "/app/settings/roles/create" ? (
        <CreateRole />
      ) : (
        <ListRoles />
      )}
    </Box>
  );
}
