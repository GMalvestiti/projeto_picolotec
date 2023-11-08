"use client";

import SearchBar from '@/app/components/dashboard/search/search';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export default function Page() {
  return (
    <Container component="main" maxWidth="xl" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography component="h1" variant="h4" align="center" fontWeight={400}>
          CLIENTES
        </Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "left" }}>
            
            <Button variant="contained">Adicionar</Button>
          </Grid>
          <Grid xs={12} sx={{ mt: 2 }}>
            <p>Table</p>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
