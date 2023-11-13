import VeiculosAddForm from "@/app/components/dashboard/veiculos/add-form";
import { Container, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container component="main" maxWidth="xs" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          fontWeight={400}
          sx={{ mb: 3 }}
        >
          Adicionar Veículo
        </Typography>
        <VeiculosAddForm />
      </Paper>
    </Container>
  );
}
