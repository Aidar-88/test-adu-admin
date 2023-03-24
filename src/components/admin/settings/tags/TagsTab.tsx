import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreateTag from "./CreateTag";
import ListTags from "./ListTags";
import OneTag from "./OneTag";

export default function TagsTab() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "25px", mb: "15px" }}>
          {location.pathname === "/app/settings/tags/create"
            ? "Добавление Тэга"
            : "Тэги"}
        </Typography>
        {location.pathname === "/app/settings/tags/create" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/tags/list")}
            sx={{ width: "160px", height: "45px", fontSize: "12px" }}
          >
            Список Тэгов
          </Button>
        ) : location.pathname === "/app/settings/tags/list" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/tags/create")}
            sx={{ width: "160px", height: "45px", fontSize: "12px" }}
          >
            Добавление Тэга
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate("/app/settings/tags/list")}
              sx={{
                width: "160px",
                height: "45px",
                fontSize: "12px",
                mr: "15px",
              }}
            >
              Список Тэгов
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/app/settings/tags/create")}
              sx={{ width: "160px", height: "45px", fontSize: "12px" }}
            >
              Добавление Тэга
            </Button>
          </Box>
        )}
      </Stack>
      {location.pathname === "/app/settings/tags/create" ? (
        <CreateTag />
      ) : location.pathname === "/app/settings/tags/list" ? (
        <ListTags />
      ) : (
        <OneTag />
      )}
    </Box>
  );
}
