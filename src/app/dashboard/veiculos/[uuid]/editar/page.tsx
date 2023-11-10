"use server";

import { getCarData, getMakes, getModels } from '@/app/actions/car';
import VeiculosEditForm from '@/app/components/dashboard/veiculos/edit-form';
import { Container, Paper, Typography } from '@mui/material';

export default async function Page({
  params,
}: Readonly<{ params: { uuid: string } }>) {
  const uuid = params.uuid;
  const [carData, initialMakes] = await Promise.all([
    getCarData(uuid),
    getMakes(),
  ]);
  const [initialModels] = await Promise.all([getModels(carData[0].make)]);

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
          Editar Veículo
        </Typography>
        <VeiculosEditForm
          uuid={uuid}
          description={carData[0].description}
          make={carData[0].make}
          model={carData[0].model}
          cost={carData[0].cost}
          makes={initialMakes}
          initialModels={initialModels}
        />
      </Paper>
    </Container>
  );
}
