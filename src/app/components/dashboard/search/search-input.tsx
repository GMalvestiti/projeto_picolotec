"use client";

import { SearchBarProps } from "@/app/lib/interfaces";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const StyledInput = styled(Input)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export default function SearchInput({
  query,
  handleQueryChange,
}: Readonly<SearchBarProps>) {
  return (
    <StyledInput value={query} type="search" onChange={handleQueryChange} />
  );
}
