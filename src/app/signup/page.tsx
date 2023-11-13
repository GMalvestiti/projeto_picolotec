import SignUpForm from "@/app/components/auth/signup-form";
import { Container, Paper, Typography } from "@mui/material";

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
