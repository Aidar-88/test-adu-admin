import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface SpecValueProps {}

export const AddValueSpecDialog: React.FC<SpecValueProps> = styled(() => (
  <Button size="large" variant="contained" />
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

// export const StyledNavLink = (props: any) => (
//   <NavLink
//     style={({ isActive }) => {
//       return {
//         color: isActive ? "black" : "blue",
//       };
//     }}
//     {...props}
//   />
// );
