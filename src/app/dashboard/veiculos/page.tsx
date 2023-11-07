"use client";

import SearchBar from "@/app/components/dashboard/search/search";
import DataTable from "@/app/components/dashboard/table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

async function fetchCarsData(query: string) {
  try {
    let API_URL = "";
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const columns: GridColDef[] = [
  { field: 'col1', headerName: "Marca"},
  { field: 'col2', headerName: "Modelo"},
  { field: 'col3', headerName: "Km/L"},
];

const rows: GridRowsProp = [
  { id: "1", col1: 'Hello', col2: 'World', col3: ""}
];

export default function Page() {
  const [data, setData] = useState(rows);
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, 500);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    fetchCarsData(query)
      .then((jsonData) => {
        setData(jsonData);
        console.log(data);
      });
  }, [debouncedValue]);

  return (
    <Container component="main" maxWidth="xl" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography component="h1" variant="h4" align="center" fontWeight={400}>
          VEÍCULOS
        </Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "left" }}>
            <SearchBar query={query} handleQueryChange={handleQueryChange} />
            <Button variant="contained" href="/dashboard/veiculos/adicionar">Adicionar</Button>
          </Grid>
          <Grid xs={12} sx={{ mt: 2 }}>
            <DataTable rows={data} columns={columns} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
