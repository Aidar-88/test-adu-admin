// style
import { useLocation } from "react-router-dom";
import { StyledNavigation } from "./style";

export default function HeaderText() {
  const location = useLocation();

  return (
    <StyledNavigation>
      {location.pathname === "/app/settings/categories/create"
        ? "Добавление Категорий"
        : location.pathname === "/app/settings/categories/delete"
        ? "Удаление Категорий"
        : "Категорий"}
    </StyledNavigation>
  );
}
