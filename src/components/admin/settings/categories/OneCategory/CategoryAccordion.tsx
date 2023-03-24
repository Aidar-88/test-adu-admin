import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ICategory } from "../../../../../types/ICategory";

interface Props {
  data: ICategory[];
}

const CategoryAccordion: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data?.map((category) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack>
              <Typography>Артикул: {category.id}</Typography>
              <Typography>Название: {category.name}</Typography>
            </Stack>

            {/* <Typography>id{category.name}</Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ ml: "40px" }}>
            {category.children?.length === 0
              ? "Нет подкатегорий"
              : category?.children?.map((child) => (
                  <>
                    <Stack sx={{ mb: "15px" }}>
                      <Typography>Артикул: {child.id}</Typography>
                      <Typography>Название: {child.name}</Typography>
                    </Stack>
                  </>
                ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CategoryAccordion;
