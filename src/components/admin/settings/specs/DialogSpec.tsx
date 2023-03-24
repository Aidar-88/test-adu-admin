import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { StyledContainedButton } from "../../../styled-components/StyledButton";
import { AddCategoryForm, AddValueForm } from "./AddForm";

interface Props {
  title: string;
  specId: number;
  forCategory?: boolean;
}

const DialogSpec: React.FC<Props> = ({ title, specId, forCategory }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <StyledContainedButton sx={{ width: "100px" }} onClick={handleClickOpen}>
        Добавить Значение
      </StyledContainedButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {forCategory
            ? `Добавить Категорию для ${title}`
            : `Добавить Значение для ${title}`}
        </DialogTitle>
        <DialogContent>
          {forCategory ? (
            <AddCategoryForm specId={specId} />
          ) : (
            <AddValueForm specId={specId} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSpec;
