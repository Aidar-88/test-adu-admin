import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useGetRolesQuery } from "../../../store/role-rtk/roleEndpoints";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
} from "../../../store/user-rtk/userEndpoints";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IRole } from "../../../types/IRole";

interface Props {
  title: string;
  userId: string;
  email: string;
  existRoles: IRole[];
  forDelete?: boolean;
}

const UserRolesMenu: React.FC<Props> = ({
  title,
  userId,
  email,
  existRoles,
  forDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { data, isLoading } = useGetRolesQuery(userId ? userId : "");
  const [addRole, { isLoading: addRoleLoading, isSuccess: addRoleSuccess }] =
    useAddRoleMutation();
  const [deleteRole, { isLoading: deleteRoleLoading }] =
    useDeleteRoleMutation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = (role: string) => {
    addRole({ email: email, role: role });
    setAnchorEl(null);
  };

  const handleDelete = (role: string) => {
    deleteRole({ email: email, role: role });
    setAnchorEl(null);
  };

  var counter = 0;

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data?.map((role) => (
          <div key={role.id}>
            {forDelete ? (
              existRoles.map((exRole) => (
                <div key={exRole.id}>
                  {role.value === exRole.value && (
                    <MenuItem
                      onClick={(a) =>
                        forDelete
                          ? handleDelete(role.value)
                          : handleAdd(role.value)
                      }
                      key={role.id}
                    >
                      <Stack direction={"row"} key={exRole.id}>
                        <Box sx={{ width: "120px" }}>
                          <Typography>{role.value}</Typography>
                        </Box>
                        <Box>
                          <Stack key={role.id}>
                            <ClearOutlinedIcon color={"error"} />
                          </Stack>
                        </Box>
                      </Stack>
                    </MenuItem>
                  )}
                </div>
              ))
            ) : (
              <MenuItem onClick={(a) => handleAdd(role.value)} key={role.id}>
                <Stack direction={"row"}>
                  <Box sx={{ width: "120px" }}>
                    <Typography>{role.value}</Typography>
                  </Box>
                  <Box>
                    <Stack key={role.id}>
                      <AddOutlinedIcon color={"success"} />
                    </Stack>
                  </Box>
                </Stack>
              </MenuItem>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default UserRolesMenu;
