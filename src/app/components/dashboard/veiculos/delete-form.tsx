"use client";

import { useRouter } from 'next/navigation';

import { DeleteCarsProps } from '@/app/lib/interfaces';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Box, Button, Input } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export async function deleteCars(formData: FormData) {
  try {
    const uuid = formData.get("uuid");

    const response = await fetch(`/api/car?uuid=${uuid}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("[ERRO]: Failed to delete car");
    }

  } catch (error) {
    console.error("[ERRO]: An error occurred while deleting car", error);
  }
}

export default function VeiculosDeleteForm({
  uuid,
}: Readonly<DeleteCarsProps>) {
  const router = useRouter()
  
  return (
    <Box component="form" action={deleteCars}>
      <Grid container spacing={2}>
        <Input type="hidden" name="uuid" value={uuid} />
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            href="/dashboard/veiculos"
            fullWidth
            size="large"
            startIcon={<KeyboardBackspaceRoundedIcon />}
          >
            Voltar
          </Button>
        </Grid>
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            type="submit"
            fullWidth
            size="large"
            onClick={() => router.push('/dashboard/veiculos')}
          >
            Excluir
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
