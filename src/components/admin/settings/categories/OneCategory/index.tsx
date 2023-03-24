import { Box, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../../store/category-rtk/categoryEndpoints";
import CategoryAccordion from "./CategoryAccordion";

const OneCategory = () => {
  const params = useParams();
  const { categoryId } = params;
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetCategoriesQuery("");

  return (
    <Box>
      <Box>
        <Stack>
          <Typography>Артикул: {categoryId}</Typography>
          <Typography sx={{ mb: "30px" }}>
            Название: {searchParams.get("name")}
          </Typography>

          {data?.map((sub) => (
            <>
              {categoryId && sub.id === parseInt(categoryId) && (
                <>
                  {sub?.children?.length !== 0 && (
                    <>
                      <div style={{ fontSize: "25px", marginBottom: "10px" }}>
                        Подкатегорий
                      </div>
                      {sub.children && (
                        <CategoryAccordion data={sub.children} />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default OneCategory;
