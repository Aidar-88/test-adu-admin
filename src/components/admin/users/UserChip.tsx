import { Chip, Paper, Stack, Tooltip } from "@mui/material";

interface Props {
  role: string;
  roleTitle: string;
}

const UserChip: React.FC<Props> = ({ role, roleTitle }) => {
  console.log(role);

  return (
    <Stack sx={{ display: "flex", justifyContent: "center" }}>
      <Tooltip title={roleTitle} placement="top">
        <Paper elevation={3} sx={{ borderRadius: "16px", mb: "15px" }}>
          <Chip label={role} sx={{ width: "100%" }} />
        </Paper>
      </Tooltip>
    </Stack>
  );
};

export default UserChip;
