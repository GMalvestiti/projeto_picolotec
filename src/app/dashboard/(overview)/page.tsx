import { logout } from "@/app/actions/auth";
import { Button, Container, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container component="main" maxWidth="xs" disableGutters sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          fontWeight={400}
          sx={{ mb: 5 }}
        >
          Bem-Vindo(a)!
        </Typography>
        <form action={logout}>
          <Button variant="contained" fullWidth size="large" type="submit">
            Sair
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
