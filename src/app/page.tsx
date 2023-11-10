import Link from "next/link";

import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Set minimum height to full viewport height
        justifyContent: "center",
      }}
    >
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" align="center" fontWeight={600}>
          ProDriver
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              href="/dashboard"
              size="large"
              LinkComponent={Link}
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" sx={{ mt: 3, mb: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="body1" align="center">
              Repositório:
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              href="https://github.com/GMalvestiti/projeto_prodriver"
              target="_blank"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="body1" align="center">
              Criador:
            </Typography>
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              href="https://www.linkedin.com/in/gustavo-malvestiti"
              target="_blank"
              startIcon={<LinkedInIcon />}
            >
              LinkedIn
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
