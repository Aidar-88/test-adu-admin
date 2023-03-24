// library
import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// icons
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

// tabs
import RolesTab from "./roles/RolesTab";
import TagsTab from "./tags/TagsTab";
import SpecsTab from "./specs/SpecsTab";
import CategoriesTab from "./categories";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SettingsTable() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<PeopleOutlinedIcon />}
            label="Роли"
            {...a11yProps(0)}
            onClick={() => navigate("/app/settings/roles/list")}
          />
          <Tab
            icon={<SortOutlinedIcon />}
            label="Категорий"
            {...a11yProps(1)}
            onClick={() => navigate("/app/settings/categories/list")}
          />
          <Tab
            icon={<LocalOfferOutlinedIcon />}
            label="Тэги"
            {...a11yProps(2)}
            onClick={() => navigate("/app/settings/tags/list")}
          />
          <Tab
            icon={<TextSnippetOutlinedIcon />}
            label="Характеристики"
            {...a11yProps(2)}
            onClick={() => navigate("/app/settings/specs/list")}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RolesTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoriesTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TagsTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SpecsTab />
      </TabPanel>
    </Box>
  );
}
