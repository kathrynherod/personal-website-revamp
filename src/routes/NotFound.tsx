import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
      >
        Go Home
      </Button>
    </Box>
  );
}
