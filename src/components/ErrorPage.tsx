import { Box, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {error.statusText}
        </Typography>
      </Box>
    );
  } else if (error instanceof Error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {error.message}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1">Oops! Unknown Error</Typography>
      </Box>
    );
  }
}
