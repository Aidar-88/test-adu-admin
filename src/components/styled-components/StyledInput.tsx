import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAdminInput = styled((props: TextFieldProps) => (
  <TextField variant="outlined" fullWidth {...props} />
))(({ theme }) => ({
  color: "#333333",
  maxHeight: "50px",
  "&:hover": {
    borderColor: "#B2BAC2",
    stroke: "#B2BAC2",
  },
  "&:focus": {
    stroke: "#B2BAC2",
    outline: "2px solid #80BFFF",
    outlineOffset: "2px",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#B2BAC2",
    },
  },
  "& .MuiFormHelperText-root": {
    textAlign: "right",
  },
}));

export const StyledCardInput = styled((props: TextFieldProps) => (
  <TextField fullWidth {...props} />
))(({ theme }) => ({
  background: "#F2F4F5",
  borderRadius: "5px",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#B2BAC2",
    },
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
  },
}));
