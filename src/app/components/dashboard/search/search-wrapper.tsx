import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function SearchWrapper() {
  return (
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
  );
}
