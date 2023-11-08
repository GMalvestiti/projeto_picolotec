"use client";

import { DeleteCarsProps } from "@/app/lib/interfaces";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Box, Button, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { deleteCars } from "@/app/lib/actions";
import Link from "next/link";

export default function VeiculosDeleteForm({
  uuid,
}: Readonly<DeleteCarsProps>) {
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
