export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "common";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    main_8: string;
    main_12: string;
    main_16: string;
    main_24: string;
    main_32: string;
    main_48: string;
  }
}

declare module "@mui/material" {
  interface Color {
    0: string;
  }
}

// SETUP COLORS
const PRIMARY = {
  light: "#FFDF6A",
  main: "#8A3FFC", // primary.main
  dark: "#33302E",
  white: "#fff",
  black: "#000",
};
const SECONDARY = {
  light: "#FFBB6A",
  main: "#F2F4F6",
  dark: "#B74B03",
  0: "#000",
  100: "#111111",
  200: "#232323",
  300: "#333333", //used
  400: "#E4E4E4", //used
  500: "#F2C94C", // yellow star
  600: "#FB4805", // like/favorite orange
  700: "#B7B7B7",
  800: "#8E8E8E",
  900: "#969696",
};
export const INFO = {
  light: "#66B5FF",
  main: "#1F90F8",
  dark: "#2073C0",
  0: "#002F34", //used
  100: "#031A61", //used
  200: "#262D35",
  400: "#A4A4A4",
  900: "#A9A9A9",
};
const SUCCESS = {
  light: "#8BF27F",
  main: "#42C747",
  dark: "#169A2E",
  100: "#B5FBDD",
};
const WARNING = {
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
};
const ERROR = {
  light: "#FF866A",
  main: "#FF0000",
  dark: "#B70B03",
  100: "#FFDFDC",
};
const GREY = {
  0: "#D0D0D0",
  100: "#C1C1C1",
  200: "#F2F4F5", //bodyBgColor
  300: "#E8E8E6",
  400: "#D5D4D0",
  500: "#5B5B5B", //used
  600: "#666666",
  700: "#7B7B7B",
  800: "#878787",
  900: "#999999",
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR, contrastText: "#fff" },
  grey: { ...GREY },
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    text: { primary: COMMON.common.black },
    background: { default: GREY[200] },
  },
} as const;

export default palette;
