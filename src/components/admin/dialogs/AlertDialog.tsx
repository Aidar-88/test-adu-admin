import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NavLink, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface AlertProps {
  id: number;
  title: string;
  header?: string;
  handleConfirm: (id: number) => void;
  isRed: boolean;
}

const AlertDialog: React.FC<AlertProps> = ({
  id,
  title,
  header,
  handleConfirm,
  isRed,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmButton = () => {
    handleConfirm(id);
    setOpen(false);
  };

  const params = useParams();

  return (
    <div>
      <Button
        sx={{ width: "115px" }}
        variant="contained"
        onClick={handleClickOpen}
        color={isRed ? "error" : "primary"}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {header ? header : "Вы точно хотите заблокировать?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {header ? header : "Заблокировать?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={handleConfirmButton} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
