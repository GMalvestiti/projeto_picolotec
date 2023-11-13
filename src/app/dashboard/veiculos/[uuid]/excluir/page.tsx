import VeiculosDeleteForm from "@/app/components/dashboard/veiculos/delete-form";
import { Container, Paper, Typography } from "@mui/material";

export default function Page({
  params,
}: Readonly<{ params: { uuid: string } }>) {
  const uuid = params.uuid;

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
          Excluir Veículo?
        </Typography>
        <VeiculosDeleteForm uuid={uuid} />
      </Paper>
    </Container>
  );
}
