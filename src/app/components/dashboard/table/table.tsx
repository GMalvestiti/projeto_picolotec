import { TableProps } from '@/app/lib/interfaces';
import { createTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type {} from '@mui/x-data-grid/themeAugmentation';

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
    <DataGrid columns={columns} rows={rows} autoHeight disableRowSelectionOnClick pageSizeOptions={[10, 25, 50]} />
  )
}