import { Outlet } from "react-router-dom";

import { Box } from "@mui/system";
import DrawerAdmin from "../admin/drawer/DrawerAdmin";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box p={'16px'} width={"100%"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
