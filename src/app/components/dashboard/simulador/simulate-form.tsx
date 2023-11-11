"use client";

import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GoogleLocationButton from "./google-button";
import { GoogleMapsFormProps, PlaceType } from "@/app/lib/interfaces";
import { useEffect, useState } from "react";

const initialValue: PlaceType = {
  place_id: "",
  description: "",
  structured_formatting: null,
}

function getLatLngFromPlaceId(placeId: any): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ placeId }, (results: any, status: any) => {
      if (status === 'OK' && results[0]?.geometry?.location) {
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        resolve(latLng);
      } else {
        resolve(null);
      }
    });
  });
}

export default function SimulateForm({
  GOOGLE_MAPS_API_KEY,
}: Readonly<GoogleMapsFormProps>) {
  const [value, setValue] = useState<PlaceType>(initialValue);

  useEffect(() => {
    if (value !== null) {
      getLatLngFromPlaceId(value.place_id).then((latLng) => {
        if (latLng) {
          console.log('Latitude:', latLng.lat);
          console.log('Longitude:', latLng.lng);
        } else {
          console.error('Unable to fetch coordinates for the provided place_id.');
        }
      });
    }
  }, [value]);

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ mt: 2 }}>
          <GoogleLocationButton
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            value={value}
            setValue={setValue}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
