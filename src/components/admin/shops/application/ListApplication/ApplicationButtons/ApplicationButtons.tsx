import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  useConfirmBlockMutation,
  useConfirmShopMutation,
} from "../../../../../../store/shop-rtk/shopEndpoints";

interface Props {
  applicationId: number;
}

const ApplicationButtons: FC<Props> = ({ applicationId }) => {
  const navigate = useNavigate();

  const [confirm, { isSuccess }] = useConfirmShopMutation();

  const [block] = useConfirmBlockMutation();

  const handleConfirm = () => {
    confirm(String(applicationId));
    // block(String(applicationId));
  };

  const handleDecline = () => {};

  return (
    <Stack>
      <Button
        variant="outlined"
        color="primary"
        sx={{ fontWeight: 600 }}
        onClick={handleConfirm}
      >
        Подтвердить
      </Button>

      <Button
        variant="outlined"
        color="primary"
        sx={{ fontWeight: 600 }}
        onClick={handleDecline}
      >
        Отклонить
      </Button>
    </Stack>
  );
};

export default ApplicationButtons;
