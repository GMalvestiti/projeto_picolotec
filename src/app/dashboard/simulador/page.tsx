import { getCarsData } from "@/app/actions/car";
import SimulateForm from "@/app/components/dashboard/simulador/simulate-form";
import { Container, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

function changeData(jsonData: any) {
  if (jsonData === undefined) {
    const error: any = [];
    return error;
  }

  let result: any = [];
  jsonData.forEach((element: any) => {
    let newData = {
      id: element.uuid,
      label: element.description,
      cost: element.cost
    };
    result.push(newData);
  });
  return result;
}

export default async function Page() {
  let [api_key, cars] = await Promise.all([process.env.GOOGLEMAPS_API_KEY, getCarsData("")]);
  cars = changeData(cars);

  return (
    <Container component="main" maxWidth="xs" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography component="h1" variant="h4" align="center" fontWeight={400}>
          SIMULADOR
        </Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <SimulateForm GOOGLE_MAPS_API_KEY={api_key} cars={cars} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
