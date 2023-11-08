"use client";

import { useEffect, useState } from 'react';

import { addVeiculo } from '@/app/lib/actions';
import { CarMake, CarModel } from '@/app/lib/interfaces';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Autocomplete, Box, Button, Chip, Input, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

async function fetchModels(query: string) {
  try {
    const response = await fetch(`/api/car/model?query=${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch car models");
    }

    const data = await response.json();
    const modelsArray: string[] = data.results.map(
      (item: CarModel) => item.model
    );
    const uniqueModelsSet = new Set(modelsArray);
    const uniqueModelsArray = Array.from(uniqueModelsSet);

    return uniqueModelsArray;
  } catch (error) {
    console.error(
      "[ERROR]: An error occurred while fetching car models",
      error
    );
  }
}

export default function VeiculosAddForm() {
  const [makes, setMakes] = useState([""]);
  const [models, setModels] = useState([""]);
  const [disabled, setDisabled] = useState(true);
  const [selectedInput, setSelectedInput] = useState("");

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch("/api/car/make");

        if (!response.ok) {
          throw new Error("Failed to fetch car makes");
        }

        const data = await response.json();
        const makesArray: string[] = data.results.map(
          (item: CarMake) => item.make
        );
        const uniqueMakesSet = new Set(makesArray);
        const uniqueMakesArray = Array.from(uniqueMakesSet);

        setMakes(uniqueMakesArray);
      } catch (error) {
        console.error(
          "[ERROR]: An error occurred while fetching car makes",
          error
        );
      }
    }

    fetchMakes();
  }, []);

  return (
    <Box component="form" action={addVeiculo}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <InputLabel htmlFor="desc">
            <b>Descrição:</b>
          </InputLabel>
          <Input
            id="description"
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
            onInputChange={async (event, query) => {
              fetchModels(query).then((newModels) => {
                if (newModels) {
                  setModels(newModels);
                  setSelectedInput(newModels[0]);
                  if (disabled) {
                    setDisabled(false);
                  }
                }
              });
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
            value={selectedInput}
            inputValue={selectedInput}
            disabled={disabled}
            onInputChange={async (event, query) => {
              setSelectedInput(query);
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
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
