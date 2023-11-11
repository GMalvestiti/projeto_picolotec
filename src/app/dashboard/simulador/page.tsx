import SimulateForm from "@/app/components/dashboard/simulador/simulate-form";
import { Container, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function Page() {

  return (
    <Container component="main" maxWidth="sm" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography component="h1" variant="h4" align="left" fontWeight={400}>
          SIMULADOR
        </Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <SimulateForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
