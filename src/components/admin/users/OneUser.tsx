import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetOneUserQuery,
} from "../../../store/user-rtk/userEndpoints";
import UserInfoTable from "./UserInfoTable";
import UserChip from "./UserChip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OneOrder from "../orders/OneOrder";
import OneShop from "../shops/OneShop";
import UserRolesMenu from "./UserRolesMenu";

const OneUser = () => {
  const params = useParams();
  const { userId } = params;
  const { data, isLoading } = useGetOneUserQuery(userId ? userId : "");

  return (
    <>
      {isLoading ? (
        <Typography
          width={"100%"}
          height={"50vh"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
          }}
        >
          Загрузка...
        </Typography>
      ) : data ? (
        <Grid container columns={6}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "25px", mb: "10px" }}>
              Пользователь {data.firstName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "20px",
              }}
            >
              <UserInfoTable
                userId={userId}
                avatar={data.avatar}
                firstName={data.firstName}
                lastName={data.lastName}
                email={data.email}
                phone={data.phone}
                activated={data.activated}
              />
              <UserRolesMenu
                title={"Добавить Роль"}
                userId={userId ? userId : ""}
                email={data.email}
                existRoles={data.roles}
              />
              <UserRolesMenu
                title={"Удалить Роль"}
                userId={userId ? userId : ""}
                email={data.email}
                existRoles={data.roles}
                forDelete={true}
              />
              <Stack sx={{ justifyContent: "center" }}>
                {data.roles.length === 0 ? (
                  <UserChip role={"Нет Роли"} roleTitle={"Нет Роли"} />
                ) : (
                  data.roles.map((role) => (
                    <UserChip
                      role={role.value}
                      roleTitle={role.description}
                      key={role.id}
                    />
                  ))
                )}
                <Tooltip
                  title={data.blocked ? "Заблокирован" : "Не Заблокирован"}
                >
                  <Paper elevation={3} sx={{ borderRadius: "16px" }}>
                    <Chip
                      label={data.blocked ? "Заблокирован" : "Не Заблокирован"}
                      color={data.blocked ? "error" : "info"}
                    />
                  </Paper>
                </Tooltip>
              </Stack>
            </Box>

            {data.shops.length === 0 ? (
              ""
            ) : (
              <Accordion>
                <AccordionSummary
                  sx={{ margin: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontSize: "25px", mb: "10px" }}>
                    Магазин Пользователя
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: "0", pl: "35px", pb: "20px" }}>
                  {data.shops.map((shop) => (
                    <Box sx={{ mb: "5px" }} key={shop.id}>
                      <OneShop userShopId={String(shop.id)} />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
            {data.basket === null || data.basket.orders.length === 0 ? (
              ""
            ) : (
              <Accordion>
                {data.basket.orders.length !== 0 && (
                  <AccordionSummary
                    sx={{ margin: 0 }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontSize: "25px", mb: "10px" }}>
                      Заказы Пользователя
                    </Typography>
                  </AccordionSummary>
                )}
                <AccordionDetails sx={{ p: "0", pl: "35px", pb: "20px" }}>
                  {data.basket.orders?.map((order) => (
                    <Box sx={{ mb: "5px" }} key={order.id}>
                      <OneOrder userOrderId={order.id} />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      ) : (
        <div>Ошибка</div>
      )}
    </>
  );
};

export default OneUser;
