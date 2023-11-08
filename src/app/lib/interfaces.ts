import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';

export interface SideNavProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

export interface SideNavItemsProps {
  open: boolean;
  items: {
    text: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export interface TopBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export interface SearchBarProps {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export interface VeiculosAutocompleteProps {
  makes: string[];
  models: string[];
}

export interface CarMake {
  make: string;
}

export interface CarModel {
  model: string;
}

export interface DeleteCarsProps {
  uuid: string;
}