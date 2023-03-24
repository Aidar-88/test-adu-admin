import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { $imageApi } from "../../../../api";
import { useDeleteProductTagMutation } from "../../../../store/product-rtk/productEndpoints";
import { useGetOneTagQuery } from "../../../../store/tags-rtk/tagEndpoints";
import { StyledAdminInput } from "../../../styled-components/StyledInput";
import ProductDialog from "../../products/ProductDialog";
import ProductsTable from "../../products/ProductsTable";

const OneTag = () => {
  const params = useParams();
  const { tagId } = params;
  const { data, isLoading } = useGetOneTagQuery(tagId ? tagId : "");
  const [
    deleteProduct,
    {
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteError,
    },
  ] = useDeleteProductTagMutation();
  const handleTagDelete = (value: number) => {
    deleteProduct({ tagId: parseInt(tagId!), productId: value });
  };

  return (
    <Box>
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
        data?.map((tag) => (
          <Grid container direction="column" spacing={3} key={tag.id}>
            <Grid
              item
              xs
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "20px",
              }}
            >
              <Grid
                container
                columns={6}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item xs={1.5}>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                    src={`${$imageApi}/${tag.image}`}
                    alt="notFound"
                  />
                  <StyledAdminInput
                    placeholder="Артикул"
                    label="Артикул"
                    name="id"
                    sx={{ mt: "24px" }}
                    disabled
                    value={tag.id}
                  />
                  <StyledAdminInput
                    placeholder="Название"
                    label="Название"
                    name="name"
                    sx={{ mt: "24px" }}
                    disabled
                    value={tag.name}
                  />
                  <StyledAdminInput
                    placeholder="Тип"
                    label="Тип"
                    name="type"
                    sx={{ mt: "24px", mb: "25px" }}
                    disabled
                    value={tag.type}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack>
                    <Typography sx={{ fontSize: "25px" }}>
                      Добавить Продукты
                    </Typography>

                    {tagId && <ProductDialog tagId={parseInt(tagId)} />}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Box sx={{ fontSize: "25px" }}>Список Продуктов</Box>
              <ProductsTable
                tagDelete={true}
                handleTagDelete={(id) => handleTagDelete(id)}
              />
            </Grid>
          </Grid>
        ))
      )}
    </Box>
  );
};

export default OneTag;
