import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/reducers/auth/auth.action";
import { StyledNavLink } from "../../styled-components/StyledButton";
// import logo from "../../../assets/adu.svg"

const DrawerAdmin = () => {
  const dispatch = useDispatch();

  return (
    <Drawer
      sx={{
        width: "200px",
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: "200px",
          boxSizing: "border-box",
          borderTopRightRadius: "15px",
          borderBottomRightRadius: "15px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <NavLink
        to="/app"
        style={{ textDecoration: "none", color: "#000", fontSize: "27px" }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>ADU Admin</Toolbar>
      </NavLink>
      <Divider />
      <List>
        <StyledNavLink to="shops">
          <ListItem button>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary={"Магазины"} />
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="products">
          <ListItem button>
            <ListItemIcon>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Товары"} />
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="orders">
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Заказы"} />
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="users">
          <ListItem button>
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Пользователи"} />
          </ListItem>
        </StyledNavLink>
        <Divider variant="middle" />
        <StyledNavLink to="banners">
          <ListItem button>
            <ListItemIcon>
              <CampaignOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Баннеры"} />
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="notifications">
          <ListItem button>
            <ListItemIcon>
              <NotificationsActiveOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Уведомление"} />
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="settings">
          <ListItem button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Настройки"} />
          </ListItem>
        </StyledNavLink>
      </List>
      <Divider />
      <List>
        <Link to="">
          <ListItem onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default DrawerAdmin;
