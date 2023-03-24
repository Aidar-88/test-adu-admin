import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateBannerMutation } from "../../../store/banner-rtk/bannerEndpoints";
import { useGetCategoriesQuery } from "../../../store/category-rtk/categoryEndpoints";
import { useGetShopsQuery } from "../../../store/shop-rtk/shopEndpoints";
import { useGetTagsQuery } from "../../../store/tags-rtk/tagEndpoints";
import { ICreateNewBanner } from "../../../types/IBanner";
import { StyledContainedButton } from "../../styled-components/StyledButton";
import BannerBlocks from "./BannerBlocks";

const initialValues = {
  shopId: null,
  type: null,
  tagId: null,
  categoryId: null,
  file: null,
  file_mobile: null,
  day: null,
};

const CreateBanner: React.FC = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = React.useState<ICreateNewBanner>(initialValues);

  const handleAddImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "desktop" | "mobile"
  ) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    if (type === "mobile") {
      setBanner((state) => ({ ...state, file_mobile: file }));
    } else {
      setBanner((state) => ({ ...state, file: file }));
    }
  };

  const handleChange = (
    e: any,
    type: "tagId" | "type" | "shopId" | "categoryId" | "day"
  ) => {
    if (type === "tagId") {
      setBanner((state) => ({ ...state, tagId: e.target.value }));
    } else if (type === "type") {
      setBanner((state) => ({ ...state, type: e.target.value }));
    } else if (type === "shopId") {
      setBanner((state) => ({ ...state, shopId: e.target.value }));
    } else if (type === "categoryId") {
      setBanner((state) => ({ ...state, categoryId: e.target.value }));
    } else if (type === "day") {
      setBanner((state) => ({ ...state, day: e.target.value }));
    }
  };

  const handleSubmit = () => {
    const { tagId, type, shopId, categoryId, file, file_mobile, day } = banner;
    const formData = new FormData();

    if (tagId !== null) {
      formData.append("tagId", String(tagId));
    }
    if (type !== null) {
      formData.append("type", String(type));
    }
    if (shopId !== null) {
      formData.append("shopId", String(shopId));
    }
    if (categoryId !== null) {
      formData.append("categoryId", String(categoryId));
    }
    if (file !== null) {
      formData.append("file", file);
    }
    if (file_mobile !== null) {
      formData.append("file_mobile", file_mobile);
    }
    if (day !== null) {
      formData.append("day", String(day));
    }
    create(formData);
  };

  const { data: tagData, isLoading: tagLoading } = useGetTagsQuery("");
  // const { data: typeData, isLoading: typeLoading } = useGetTypeQuery("");
  const { data: shopData, isLoading: shopLoading } = useGetShopsQuery({
    page: 0,
    rowsPerPage: 10,
  });
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery("");

  const [
    create,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
    },
  ] = useCreateBannerMutation();

  useEffect(() => {
    if (createSuccess) {
      setTimeout(() => {
        navigate("/app/banners");
      }, 2000);
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      setTimeout(() => {
        navigate("/app/banners/create");
      }, 2000);
    }
  }, [createError]);

  return (
    <Box sx={{ p: "30px" }}>
      <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: "15px" }}>
        Создать Баннер
      </Typography>
      <Grid
        container
        columns={12}
        spacing={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item xs={3}>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <InputLabel id="demo-simple-select-label">TagID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={banner.tagId}
              label="TagID"
              onChange={(e) => handleChange(e, "tagId")}
            >
              {tagData?.map((tag) => (
                <MenuItem value={tag.id} key={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={banner.type}
              label="Type"
              onChange={(e) => handleChange(e, "type")}
            >
              <MenuItem value={"MAIN"}>MAIN</MenuItem>
              <MenuItem value={"MADEINKZ"}>MADEINKZ</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <InputLabel id="demo-simple-select-label">ShopID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={banner.shopId}
              label="ShopID"
              onChange={(e) => handleChange(e, "shopId")}
            >
              {shopData?.shops?.map((shop) => (
                <MenuItem value={shop.id} key={shop.id}>
                  {shop.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <InputLabel id="demo-simple-select-label">CategoryID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={banner.categoryId}
              label="CategoryID"
              onChange={(e) => handleChange(e, "categoryId")}
            >
              {categoryData?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <TextField
              id="outlined-basic"
              label="Дедлайн"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 999 } }}
              variant="outlined"
              value={banner.day}
              onChange={(e) => handleChange(e, "day")}
            />
          </FormControl>

          <Stack sx={{ mb: "20px" }}>
            <label>Desktop version</label>
            <input type="file" onChange={(e) => handleAddImage(e, "desktop")} />
          </Stack>
          <Stack sx={{ mb: "20px" }}>
            <label>Mobile version</label>
            <input type="file" onChange={(e) => handleAddImage(e, "mobile")} />
          </Stack>
          <Box sx={{ width: "100%" }}>
            {createLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : createError ? (
              <Alert variant="outlined" severity="error">
                Ошибка!
              </Alert>
            ) : createSuccess ? (
              <Alert variant="outlined" severity="success">
                Успешно Добавлено!
              </Alert>
            ) : (
              <StyledContainedButton onClick={handleSubmit} fullWidth>
                Добавить
              </StyledContainedButton>
            )}
          </Box>
        </Grid>
        {tagData && <BannerBlocks tagData={tagData} banner={banner} />}
      </Grid>
    </Box>
  );
};

export default CreateBanner;
