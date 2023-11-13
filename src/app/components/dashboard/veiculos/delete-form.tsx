"use client";

import Link from "next/link";

import { deleteCar } from "@/app/actions/car";
import { UuidProps } from "@/app/lib/interfaces";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Box, Button, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function VeiculosDeleteForm({ uuid }: Readonly<UuidProps>) {
  return (
    <Box component="form" action={deleteCar}>
      <Grid container spacing={2}>
        <Input type="hidden" name="uuid" value={uuid} />
        <Grid xs={6} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            href="/dashboard/veiculos"
            fullWidth
            size="large"
            LinkComponent={Link}
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
          >
            Excluir
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
