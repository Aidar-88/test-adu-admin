import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const StyledContainedButton = styled((props: ButtonProps) => (
  <Button size="large" variant="contained" {...props} />
))(({ theme }) => ({
  height: "40px",
  background: "#BBBBBB",
  borderRadius: "10px",
  fontSize: ".7rem",
  color: "#fff",
  boxShadow: "none",
  "&:hover": {
    background: "#8A3FFC",
  },
}));

export const StyledNavLink = (props: any) => (
  <NavLink
    style={({ isActive }) => {
      return {
        color: isActive ? "black" : "blue",
      };
    }}
    {...props}
  />
);

// Category
export const StyledActionButton = styled((props: ButtonProps) => (
  <Button variant="contained" {...props} />
))(({ theme }) => ({
  width: "150px",
  height: "45px",
  fontSize: "12px",
}));

export const StyledDangerButton = styled((props: ButtonProps) => (
  <Button variant="contained" {...props} color="error" />
))(({ theme }) => ({
  width: "150px",
  height: "45px",
  fontSize: "12px",
}));
