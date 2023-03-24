import { Box, Paper, Stack, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { $imageApi } from "../../../api";

interface Props {
  userId: string | undefined;
  avatar: null | any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activated: boolean;
}

const UserInfoTable: React.FC<Props> = ({
  userId,
  avatar,
  firstName,
  lastName,
  email,
  phone,
  activated,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: "15px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "25px",
      }}
    >
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <Box sx={{ mr: "10px" }}>
          {avatar === null ? (
            <AccountCircleOutlinedIcon
              sx={{ width: "100px", height: "100px" }}
            />
          ) : (
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
              src={`${$imageApi}/${avatar}`}
              alt="notFound"
            />
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Stack sx={{ width: "100px" }}>
            <Typography sx={{ fontWeight: 700 }}>Артикул</Typography>
            <Typography sx={{ fontWeight: 700 }}>Имя</Typography>
            <Typography sx={{ fontWeight: 700 }}>Фамилия</Typography>
          </Stack>
          <Stack>
            <Typography>{userId}</Typography>
            <Typography>{firstName}</Typography>
            <Typography>{lastName}</Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack sx={{ width: "100px" }}>
            <Typography sx={{ fontWeight: 700 }}>Почта</Typography>
            <Typography sx={{ fontWeight: 700 }}>Телефон</Typography>
            <Typography sx={{ fontWeight: 700 }}>Активация</Typography>
          </Stack>
          <Stack>
            <Typography>{email}</Typography>
            <Typography>{phone}</Typography>
            <Typography sx={{ color: activated ? "green" : "red" }}>
              {activated ? "Активирован" : "Не Активирован"}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserInfoTable;
