import { Chip, ChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";

// export const StyledChip = styled((props: ChipProps) => (
//   <Chip
//     size='small'
//     variant='outlined'
//     {...props}
//   />
// ))(() => ({
//   backgroundColor: '#F2F4F5',
//   color: '#000000',
//   borderRadius: '5px',
//   border: 'none',
//   mr: '0.5rem',
//   mb: '0.5rem'
// }));

interface Props {
  title: string;
  icon?: any;
  backColor?: any;
  textColor?: string;
}

export const StyledChip: FunctionComponent<Props> = ({
  title,
  icon,
  backColor,
  textColor,
}) => {
  return (
    <Chip
      size="small"
      label={title ? title : ""}
      icon={icon ? icon : ""}
      color={backColor ? backColor : "success"}
      variant="outlined"
      sx={{
        color: textColor ? textColor : "#000",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        p: "1rem",
        mr: "0.5rem",
        mb: "0.5rem",
      }}
    />
  );
};

export const StyledOrderStatusChip = styled((props: ChipProps) => (
  <Chip {...props} />
))(({ theme }) => ({
  backgroundColor: "#6FDC8C",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "5px",
  fontSize: "14px",
  color: "#fff",
  padding: "7px",
}));
