"use client";

import { useEffect, useState } from "react";

import {
  GoogleMapsFormProps,
  PlaceType,
  RouteDistanceResult,
} from "@/app/lib/interfaces";
import {
  Autocomplete,
  Box,
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import GoogleLocationButton from "./google-button";

const initialData: PlaceType = {
  place_id: "",
  description: "",
  structured_formatting: null,
};

async function calculateDistance(
  originPlaceId: string,
  destinationPlaceId: string,
): Promise<RouteDistanceResult | null> {
  const directionsService = new google.maps.DirectionsService();

  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: { placeId: originPlaceId },
        destination: { placeId: destinationPlaceId },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response != null) {
          const route = response.routes[0];
          let totalDistance = 0;

          route.legs.forEach((leg) => {
            totalDistance += leg.distance?.value || 0;
          });

          const distanceInKm = totalDistance / 1000;

          resolve({ distance: distanceInKm });
        } else {
          console.error("Directions request failed with status:", status);
          reject(null);
        }
      },
    );
  });
}

export default function SimulateForm({
  GOOGLE_MAPS_API_KEY,
  cars,
}: Readonly<GoogleMapsFormProps>) {
  const [origin, setOrigin] = useState<PlaceType>(initialData);
  const [destination, setDestination] = useState<PlaceType>(initialData);
  const [custo, setCusto] = useState<number>(0);

  const handleSubmit = function (formData: FormData) {
    if (
      origin != initialData &&
      destination != initialData &&
      origin != null &&
      destination != null
    ) {
      calculateDistance(origin.place_id, destination.place_id)
        .then((result) => {
          if (result) {
            const description = formData.get("cars");
            const car = cars.filter((c: any) => {
              return c.label === description;
            });
            if (car.length > 0) {
              const gas = formData.get("gas");
              const cost =
                Number(gas) *
                (Number(result.distance.toFixed(2)) / car[0].cost);
              setCusto(Number(cost.toFixed(2)));
            } else {
              console.error("[Erro]: Nenhum carro encontrado.");
            }
          } else {
            console.error("[Erro]: Falha ao calcular distância.");
          }
        })
        .catch((error) => {
          console.error("Erro: ", error);
        });
    }
  };

  return (
    <Box component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ mt: 2 }}>
          <InputLabel htmlFor="origin">
            <b>Origem:</b>
          </InputLabel>
          <GoogleLocationButton
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            value={origin}
            setValue={setOrigin}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="destination">
            <b>Destino:</b>
          </InputLabel>
          <GoogleLocationButton
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            value={destination}
            setValue={setDestination}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="destination">
            <b>Veículo:</b>
          </InputLabel>
          <Autocomplete
            disablePortal
            id="cars"
            options={cars}
            sx={{ width: 400, mt: 1 }}
            renderInput={(params) => (
              <TextField {...params} name="cars" required />
            )}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="gas">
            <b>Preço do Combustível (R$):</b>
          </InputLabel>
          <Input
            id="gas"
            sx={{ mt: 1 }}
            type="number"
            name="gas"
            fullWidth
            required
          />
        </Grid>
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button variant="contained" type="submit" fullWidth size="large">
            Simular
          </Button>
        </Grid>
        <Grid xs={6} sx={{ mt: 2 }}>
          <Typography gutterBottom variant="h6" align="center" fontWeight={400}>
            Custo: R${custo}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
