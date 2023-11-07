import { alpha, styled } from "@mui/material/styles";
import SearchWrapper from "./search-wrapper";
import SearchInput from "./search-input";
import { SearchBarProps } from "@/app/lib/interfaces";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #ddd",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(2),
    width: "auto",
  },
}));

export default function SearchBar({
  query,
  handleQueryChange,
}: Readonly<SearchBarProps>) {
  return (
    <Search>
      <SearchWrapper />
      <SearchInput query={query} handleQueryChange={handleQueryChange} />
    </Search>
  );
}
