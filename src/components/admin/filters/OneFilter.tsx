import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { StyledAdminInput } from "../../styled-components/StyledInput";
import React from "react";
import { useGetShopsQuery } from "../../../store/shop-rtk/shopEndpoints";
import { useGetTagsQuery } from "../../../store/tags-rtk/tagEndpoints";
import { integerPropType } from "@mui/utils";

interface Props {
  setQuery: (values: any) => void;
  shopId?: any;
  tagId?: any;
  forUsers?: boolean;
}

const OneFilter: React.FC<Props> = ({ setQuery, shopId, tagId, forUsers }) => {
  const array = [
    { id: 1, name: "SULPAK" },
    { id: 2, name: "BELIY VETER" },
    { id: 3, name: "TECHNODOM" },
  ];

  const shopDef: number = 1;

  tagId = parseInt(tagId);

  const formik = useFormik({
    initialValues: {
      search: "",
      tagId: "",
      shopId: shopId ? shopId : "",
      priceFrom: "",
      priceTo: "",
      category: "",
    },
    onSubmit: (values) => {
      setQuery(values);
    },
  });
  const { values, handleChange, handleSubmit } = formik;

  const { data, isLoading } = useGetShopsQuery({ page: 0, rowsPerPage: 0 });
  const { data: tagData, isLoading: tagLoading } = useGetTagsQuery("");

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      sx={{ alignItems: "flex-end", justifyContent: "center" }}
    >
      <Grid item>
        <StyledAdminInput
          variant="outlined"
          size="small"
          sx={{ width: "300px" }}
          placeholder={
            forUsers ? "Поиск по фио, почте, номеру" : "Поиск по названию"
          }
          name="search"
          value={values.search}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {forUsers ? (
        ""
      ) : (
        <>
          <Grid item>
            <Typography>Цена:</Typography>
            <StyledAdminInput
              variant="outlined"
              size="small"
              sx={{ width: "100px", mr: "10px" }}
              placeholder="С"
              name="priceFrom"
              value={values.priceFrom}
              onChange={handleChange}
            />
            <StyledAdminInput
              variant="outlined"
              size="small"
              sx={{ width: "100px" }}
              placeholder="По"
              name="priceTo"
              value={values.priceTo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <FormControl sx={{ width: "120px", mr: "5px" }}>
              <InputLabel id="demo-simple-select-label">Магазин</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.shopId}
                label="Магазин"
                onChange={handleChange}
                name="shopId"
                defaultValue={shopId}
                defaultChecked={shopId}
                sx={{ height: "40px" }}
              >
                <MenuItem value={""}>Все</MenuItem>
                {data?.shops.map((shop) => (
                  <MenuItem value={shop.id} key={shop.id}>
                    {shop.name}
                  </MenuItem>
                ))}
              </Select>

              {/* test Select */}
              {/* <Select
                labelId="demo"
                id="demo"
                value={shopDef}
                label="array"
                onChange={handleChange}
                name="shopId"
                defaultValue={shopDef}
                defaultChecked={true}
                sx={{ height: "40px" }}
              >
                <MenuItem value={""}>TestMagaz</MenuItem>
                {array.map((el) => (
                  <MenuItem value={el.id} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select> */}
            </FormControl>
            <FormControl sx={{ width: "120px" }}>
              <InputLabel id="demo-simple-select-label">Тэг</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tagId}
                label="Тэг"
                onChange={handleChange}
                name="tagId"
                defaultValue={tagId ? tagId : ""}
                defaultChecked={true}
                // defaultValue={tagId !== 0 ? tagId : ""}
                // defaultChecked={tagId !== 0 ? tagId : ""}
                sx={{ height: "40px" }}
              >
                <MenuItem value={""}>Все</MenuItem>
                {tagData?.map((tag) => (
                  <MenuItem value={String(tag.id)} key={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Применить
        </Button>
      </Grid>
    </Grid>
  );
};

export default OneFilter;
