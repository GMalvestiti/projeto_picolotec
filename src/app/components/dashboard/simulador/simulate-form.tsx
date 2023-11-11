"use client";

import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GoogleLocationButton from "./google-button";
import { GoogleMapsFormProps, PlaceType, RouteDistanceResult } from "@/app/lib/interfaces";
import { useEffect, useState } from "react";

const initialData: PlaceType = {
  place_id: "",
  description: "",
  structured_formatting: null,
};

async function calculateDistance(
  originPlaceId: string,
  destinationPlaceId: string
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
      }
    );
  });
}

export default function SimulateForm({
  GOOGLE_MAPS_API_KEY,
}: Readonly<GoogleMapsFormProps>) {
  const [origin, setOrigin] = useState<PlaceType>(initialData);
  const [destination, setDestination] = useState<PlaceType>(initialData);

  useEffect(() => {
    if ((origin != initialData) && (destination != initialData) && (origin != null) && (destination != null)) {
      calculateDistance(origin.place_id, destination.place_id)
        .then((result) => {
          if (result) {
            console.log(`Distância: ${result.distance.toFixed(2)} km`);
          } else {
            console.error("Falha ao calcular distância.");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }, [origin, destination]);

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ mt: 2 }}>
          <GoogleLocationButton
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            value={origin}
            setValue={setOrigin}
          />
          <br />
          <GoogleLocationButton
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            value={destination}
            setValue={setDestination}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
