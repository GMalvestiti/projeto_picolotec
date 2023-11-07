import { TableProps } from "@/app/lib/interfaces";
import { DataGrid } from '@mui/x-data-grid';

import type {} from '@mui/x-data-grid/themeAugmentation';
import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});

export default function DataTable({ 
  columns,
  rows 
}: Readonly<TableProps>) {
  return (
    <DataGrid rows={rows} columns={columns} />
  )
}