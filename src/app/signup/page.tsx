import { Container, Paper, Typography } from '@mui/material';

import SignUpForm from '../components/auth/signup-form';

export default function Page() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" align="center" fontWeight={600}>
          Criar Conta
        </Typography>
        <SignUpForm />
      </Paper>
    </Container>
  );
}
