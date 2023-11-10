"use client";

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import SearchBar from '@/app/components/dashboard/search/search';
import DataTable from '@/app/components/dashboard/table/table';
import { getCarsData } from '@/app/actions/car';
import { Button, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid';

function changeData(jsonData: any): GridRowsProp {
  if (jsonData === undefined) {
    const error: GridRowsProp = [];
    return error;
  }

  let result: any = [];
  let count = 1;
  jsonData.forEach((element: any) => {
    let newData = {
      id: count,
      uuid: element.id,
      col1: element.description,
      col2: element.make,
      col3: element.model,
      col4: element.cost,
    };
    result.push(newData);
    count++;
  });
  return result;
}

const columns: GridColDef[] = [
  { field: "col1", headerName: "Descrição", flex: 3, align: "center", headerAlign: "center" },
  { field: "col2", headerName: "Marca", flex: 3, align: "center", headerAlign: "center" },
  { field: "col3", headerName: "Modelo", flex: 3, align: "center", headerAlign: "center" },
  { field: "col4", headerName: "Performance (Km/L)", flex: 3, align: "center", headerAlign: "center" },
  {
    field: "col5",
    headerName: "",
    disableColumnMenu: true,
    sortable: false,
    flex: 1,
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return (
        <Button
          variant="contained"
          color="primary"
          href={`/dashboard/veiculos/${row.uuid}/editar`}
        >
          Editar
        </Button>
      );
    },
  },
  {
    field: "col6",
    headerName: "",
    disableColumnMenu: true,
    sortable: false,
    flex: 1,
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return (
        <Button
          variant="contained"
          color="error"
          href={`/dashboard/veiculos/${row.uuid}/excluir`}
        >
          Excluir
        </Button>
      );
    },
  },
];

const initialRows: GridRowsProp = [];

export default function Page() {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, 500);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getCarsData(query).then((jsonData) => {
      setRows(changeData(jsonData));
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
            <Button variant="contained" href="/dashboard/veiculos/adicionar">
              Adicionar
            </Button>
          </Grid>
          <Grid xs={12} sx={{ mt: 2 }}>
            <DataTable columns={columns} rows={rows} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
