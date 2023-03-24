import React from "react";
import { Paper, Box } from "@mui/material";
import LoginForm from "./LoginForm";

const LoginPaper = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper elevation={10} sx={{ padding: "16px", borderRadius: "15px" }}>
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPaper;
