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
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useConfirmBlockMutation,
  useConfirmShopMutation,
  useGetOneShopQuery,
} from "../../../store/shop-rtk/shopEndpoints";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { $imageApi } from "../../../api";
import AlertDialog from "../dialogs/AlertDialog";
import ShopAdminsTable from "./ShopAdminsTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef } from "react";

interface Props {
  userShopId?: string;
}

const OneShop: React.FC<Props> = ({ userShopId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { shopId } = params;

  const { data, isLoading } = useGetOneShopQuery(
    shopId ? shopId : String(userShopId)
  );
  const [confirm] = useConfirmShopMutation();
  const [confirmBlock] = useConfirmBlockMutation();

  const handleConfirm = () => {
    confirm(String(shopId ? shopId : userShopId));
  };
  const handleBlock = (id: number) => {
    confirmBlock(String(shopId ? shopId : userShopId));
  };

  const ref = useRef(null);

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
      ) : (
        <Grid
          container
          columns={6}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={2.5}>
            <Stack direction="row">
              {data?.shop.logo ? (
                <img
                  src={`${$imageApi}/${data?.shop.logo}`}
                  alt="logoImg"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    marginRight: "15px",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "75px",
                    height: "75px",
                    marginRight: "10px",
                    background: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AccountCircleOutlinedIcon
                    sx={{ color: "white", fontSize: "55px" }}
                  />
                </Box>
              )}
              <Stack sx={{ marginBottom: "30px" }}>
                <Stack>
                  <Typography>{data?.shop.name}</Typography>
                  <Typography>{data?.shop.name}</Typography>
                </Stack>
                <Typography>{data?.shop.bin_iin}</Typography>
                <Typography>{data?.shop.legalAddress}</Typography>
              </Stack>
            </Stack>
            <Stack sx={{ marginBottom: "30px" }}>
              <Typography>Владелец</Typography>
              <Typography>
                {data?.shop.owner?.firstName} {data?.shop.owner?.lastName}
              </Typography>
              <Typography>{data?.shop.owner?.phone}</Typography>
              <Typography>{data?.shop.owner?.email}</Typography>
            </Stack>
            <Stack direction="row">
              <Button
                variant="outlined"
                sx={{ mr: "8px" }}
                onClick={() => navigate(`/app/products/list/${shopId}`)}
              >
                Товары
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/app/orders/list/${shopId}`)}
              >
                Заказы
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              mr: "20px",
            }}
          >
            <Box sx={{}}>
              <Stack>
                <Chip
                  label={data?.shop?.confirm ? "Подтврежден" : "Не Подтврежден"}
                  color={data?.shop?.confirm ? "success" : "error"}
                  sx={{
                    width: "200px",
                    color: "#fff",
                    p: "8px",
                    mb: "10px",
                  }}
                />
                {data?.shop.block ? (
                  <Chip
                    label={"Заблокирован"}
                    color={"error"}
                    sx={{
                      width: "200px",
                      color: "#fff",
                      p: "8px",
                    }}
                  />
                ) : (
                  ""
                )}
              </Stack>
              <Stack sx={{ mb: "20px" }}>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  color="success"
                  sx={{ mt: "30px", mb: "10px", width: "100%" }}
                >
                  Подтвердить
                </Button>

                <AlertDialog
                  isRed={false}
                  title={data?.shop.block ? "Разблокировать" : "Заблокировать"}
                  header={
                    data?.shop.block
                      ? "Вы точно хотите Разблокировать?"
                      : "Вы точно хотите Заблокировать?"
                  }
                  handleConfirm={(id: number) => handleBlock(id)}
                  id={parseInt(shopId!)}
                />
              </Stack>
            </Box>
            <Stack
              sx={{
                marginBottom: "30px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Админы</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data && <ShopAdminsTable admins={data.shop.admin_users} />}
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OneShop;
