// library
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// modules
import HeaderText from "./HeaderText";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
      <HeaderText />
      <HeaderButton />
    </Stack>
  );
}
