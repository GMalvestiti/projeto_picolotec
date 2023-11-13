"use client";

import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Box, Button, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions/auth';

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);

  return (
    <Box component="form" action={action} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
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
          <InputLabel htmlFor="password">
            <b>Senha:</b>
          </InputLabel>
          <Input
            id="password"
            name="password"
            sx={{ mt: 1 }}
            type="password"
            placeholder="Senha"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      {code === 'CredentialSignin' && (
            <Typography variant="body1" sx={{ color: "red", mt: 1 }}>
              Credenciais inválidas
            </Typography>
          )}
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
          <LoginButton />
        </Grid>
      </Grid>
    </Box>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button variant="contained" type="submit" size="large" fullWidth aria-disabled={pending}>
      Entrar
    </Button>
  );
}
