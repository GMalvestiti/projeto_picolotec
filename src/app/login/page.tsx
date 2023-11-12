import { Container, Paper, Typography } from '@mui/material';

import LoginForm from '../components/auth/login-form';

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
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
}
