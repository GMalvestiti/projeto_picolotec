"use client";

import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import GoogleLocationButton from './google-button';

export default function SimulateForm() {
  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ mt: 2 }}>
          <GoogleLocationButton />
        </Grid>
      </Grid>
    </Box>
  );
}
