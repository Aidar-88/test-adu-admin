import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  useGetOneProductQuery,
  useUpdateProductMutation,
} from "../../../store/product-rtk/productEndpoints";
import { IProductUpdateOne } from "../../../types/IProduct";
import { StyledContainedButton } from "../../styled-components/StyledButton";
import { StyledAdminInput } from "../../styled-components/StyledInput";

const FormProduct = () => {
  const params = useParams();
  const { productId } = params;
  const { data, isLoading } = useGetOneProductQuery(productId ? productId : "");
  const [update] = useUpdateProductMutation();

  const formik = useFormik({
    initialValues: { ...data?.product },
    onSubmit: (values) => {
      update(values as IProductUpdateOne);
    },
  });

  const { values, isValid, dirty, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Название товара"
            label="Название товара"
            name="title"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.title}
          />
          <StyledAdminInput
            placeholder="Цена"
            label="Цена"
            name="price"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.price}
          />
          <StyledAdminInput
            placeholder="Скидка"
            label="Скидка"
            name="discount"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.discount}
          />
        </Grid>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Краткое Описание"
            label="Краткое Описание"
            name="smallDesc"
            onChange={handleChange}
            value={values.smallDesc}
            multiline
            rows={2}
            sx={{ mb: "28px", mt: "24px" }}
          />
          <StyledAdminInput
            placeholder="Полное Описание"
            label="Полное Описание"
            name="fullDesc"
            sx={{ mt: "24px" }}
            multiline
            rows={3}
            onChange={handleChange}
            value={values.fullDesc}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledAdminInput
            placeholder="Брэнд"
            label="Брэнд"
            name="brand"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.brand}
          />
          {values.category && (
            <StyledAdminInput
              placeholder="Категория"
              label="Категория"
              name="category"
              sx={{ mt: "24px" }}
              onChange={handleChange}
              value={values.category.name}
            />
          )}
          <StyledAdminInput
            placeholder="Количество"
            label="Количество"
            name="quantity"
            sx={{ mt: "24px" }}
            onChange={handleChange}
            value={values.quantity}
          />
        </Grid>
      </Grid>
      <StyledContainedButton
        disabled={isValid && !dirty}
        type="submit"
        sx={{ mt: 2 }}
      >
        Изменить
      </StyledContainedButton>
    </form>
  );
};

export default FormProduct;
