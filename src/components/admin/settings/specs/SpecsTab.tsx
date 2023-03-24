import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../store/category-rtk/categoryEndpoints";
import CreateSpec from "./CreateSpec";
import CreateRole from "./CreateSpec";
import ListSpecs from "./ListSpecs";
import ListRoles from "./ListSpecs";
import OneSpec from "./OneSpec";
import OneCategory from "./OneSpec";

export default function SpecsTab() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "25px", mb: "15px" }}>
          {location.pathname === "/app/settings/specs/create"
            ? "Добавление Характеристики"
            : "Характеристики"}
        </Typography>
        {location.pathname === "/app/settings/specs/create" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/specs/list")}
            sx={{ width: "160px", height: "45px", fontSize: "12px" }}
          >
            Список Характеристик
          </Button>
        ) : location.pathname === "/app/settings/specs/list" ? (
          <Button
            variant="contained"
            onClick={() => navigate("/app/settings/specs/create")}
            sx={{ width: "160px", height: "45px", fontSize: "12px" }}
          >
            Добавить Характеристику
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate("/app/settings/specs/list")}
              sx={{
                width: "160px",
                height: "45px",
                fontSize: "12px",
                mr: "15px",
              }}
            >
              Список Характеристик
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/app/settings/specs/create")}
              sx={{ width: "160px", height: "45px", fontSize: "12px" }}
            >
              Добавить Характеристику
            </Button>
          </Box>
        )}
      </Stack>
      {location.pathname === "/app/settings/specs/create" ? (
        <CreateSpec />
      ) : location.pathname === "/app/settings/specs/list" ? (
        <ListSpecs />
      ) : (
        <OneSpec />
      )}
    </Box>
  );
}
