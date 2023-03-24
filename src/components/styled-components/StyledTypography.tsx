import { Typography } from "@mui/material";

export const StyledHeaderTypography = (props: any) => (
  // for HeaderTypography of everyHeaders
  <Typography
    sx={{
      fontSize: "25px",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif ",
    }}
    {...props}
  />
);
