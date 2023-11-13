"use client";

import { signUp } from '@/app/actions/auth';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Box, Button, Grid, Input, InputLabel } from '@mui/material';

export default function LoginForm() {
  return (
    <Box component="form" sx={{ mt: 2 }} action={signUp}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel htmlFor="nome">
            <b>Nome:</b>
          </InputLabel>
          <Input
            id="nome"
            name="nome"
            sx={{ mt: 1 }}
            type="text"
            placeholder="Nome"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="email">
            <b>Email:</b>
          </InputLabel>
          <Input
            id="email"
            name="email"
            sx={{ mt: 1 }}
            type="email"
            placeholder="Email"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="senha">
            <b>Senha:</b>
          </InputLabel>
          <Input
            id="senha"
            name="senha"
            sx={{ mt: 1 }}
            type="password"
            placeholder="Senha"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            href="/"
            startIcon={<KeyboardBackspaceRoundedIcon />}
          >
            Voltar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" type="submit" size="large" fullWidth>
            Criar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
