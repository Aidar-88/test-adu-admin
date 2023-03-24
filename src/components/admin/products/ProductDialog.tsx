import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ProductsTable from "./ProductsTable";
import { useAddProductTagMutation, useGetOneProductQuery } from "../../../store/product-rtk/productEndpoints";
import { $imageApi } from "../../../api";
import { Alert, Box, CircularProgress } from "@mui/material";
import { StyledContainedButton } from "../../styled-components/StyledButton";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleProductClick = (value: string): number => {
    onClose(value);
    return 0;
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Выберите Товар</DialogTitle>
      <ProductsTable
        forTag={true}
        handleProductClick={(a) => handleProductClick(a)}
      />
    </Dialog>
  );
}

interface Props {
  tagId: number;
}

const ProductDialog: React.FC<Props> = ({ tagId }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const { data, isSuccess } = useGetOneProductQuery(
    selectedValue ? selectedValue : ""
  );
  const [add, { isLoading: addLoading, isError, isSuccess: isAddSuccess }] =
    useAddProductTagMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClick = (product: number) => {
    add({ productId: product, tagId: tagId });
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div" sx={{ mb: "10px" }}>
        Выбрано: {data?.product.title}
      </Typography>
      {isSuccess && (
        <img
          style={{
            width: "260px",
            marginBottom: "10px",
            objectFit: "contain",
          }}
          src={`${$imageApi}/${data?.product.image}`}
          alt="notFound"
        />
      )}
      <br />
      <Stack direction="row">
        <Button
          variant="outlined"
          sx={{ width: "174px", mr: "10px" }}
          onClick={handleClickOpen}
        >
          Открыть Список Продуктов
        </Button>
        {addLoading ? (
          <Box
            sx={{ width: "110px", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert variant="outlined" severity="error" sx={{ mt: "15px" }}>
            Ошибка при добавлений продукта!
          </Alert>
        ) : isAddSuccess ? (
          <Alert variant="outlined" severity="success" sx={{ mt: "15px" }}>
            Успешно Добавлено!
          </Alert>
        ) : (
          data && (
            <Button
              variant="outlined"
              onClick={() => handleClick(data?.product.id)}
              sx={{ width: "174px" }}
            >
              Добавить Продукт
            </Button>
          )
        )}
      </Stack>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default ProductDialog;
