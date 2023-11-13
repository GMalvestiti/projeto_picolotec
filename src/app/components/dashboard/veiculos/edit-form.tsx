"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getModels, putCar } from "@/app/actions/car";
import { CarEditProps } from "@/app/lib/interfaces";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function VeiculosEditForm({
  uuid,
  description,
  make,
  model,
  cost,
  makes,
  initialModels,
}: Readonly<CarEditProps>) {
  const [models, setModels] = useState(initialModels);
  const [selectedMake, setSelectedMake] = useState(make);
  const [selectedModel, setSelectedModel] = useState(model);

  useEffect(() => {
    async function fetchModels() {
      getModels(selectedMake).then((newModels) => {
        if (newModels) {
          setModels(newModels);
        }
      });
    }

    fetchModels();
  }, [selectedMake]);

  const handleSubmit = function (formData: FormData) {
    putCar(uuid, formData);
  };

  return (
    <Box component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <InputLabel htmlFor="description">
            <b>Descrição:</b>
          </InputLabel>
          <Input
            id="description"
            defaultValue={description}
            sx={{ mt: 1 }}
            name="description"
            type="text"
            placeholder="Descrição"
            fullWidth
            required
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="make">
            <b>Marca:</b>
          </InputLabel>
          <Autocomplete
            sx={{ mt: 1 }}
            id="make"
            options={makes}
            defaultValue={make}
            onInputChange={(event, value) => {
              setSelectedMake(value);
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip {...getTagProps({ index })} key={option} label={option} />
              ));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="make"
                placeholder="Marca"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="model">
            <b>Modelo:</b>
          </InputLabel>
          <Autocomplete
            sx={{ mt: 1 }}
            id="model"
            options={models}
            inputMode="search"
            value={selectedModel}
            inputValue={selectedModel}
            onInputChange={(event, value) => {
              setSelectedModel(value);
            }}
            freeSolo
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip {...getTagProps({ index })} key={option} label={option} />
              ));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="model"
                placeholder="Modelo"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="cost">
            <b>Km/L:</b>
          </InputLabel>
          <Input
            id="cost"
            defaultValue={cost}
            sx={{ mt: 1 }}
            type="number"
            name="cost"
            placeholder="Km/L"
            fullWidth
            required
          />
        </Grid>
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            href="/dashboard/veiculos"
            fullWidth
            size="large"
            LinkComponent={Link}
            startIcon={<KeyboardBackspaceRoundedIcon />}
          >
            Voltar
          </Button>
        </Grid>
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button variant="contained" type="submit" fullWidth size="large">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
