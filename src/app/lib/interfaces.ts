import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';
import { Dispatch, SetStateAction } from 'react';

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

export interface UuidProps {
  uuid: string;
}

export interface CarEditProps {
  uuid: string;
  description: string;
  make: string;
  model: string;
  cost: number;
  makes: string[];
  initialModels: string[];
}

export interface GoogleMapsFormProps {
  GOOGLE_MAPS_API_KEY: any;
  cars: any;
}

export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: any;
}

export interface GoogleMapsButtonProps {
  GOOGLE_MAPS_API_KEY: any;
  value: PlaceType | null;
  setValue: Dispatch<SetStateAction<PlaceType>>;
}

export interface RouteDistanceResult {
  distance: number;
}
