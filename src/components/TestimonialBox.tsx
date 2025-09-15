import { Box, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)`
  background-color: ${({ theme }) =>
    theme.palette.mode === "light" ? "#f0f7ff" : "#0a1929"};
  border-left: 4px solid
    ${({ theme }) => (theme.palette.mode === "light" ? "#0a1929" : "#f0f7ff")};
  padding: ${({ theme }) => theme.spacing(2, 3)};
  margin: ${({ theme }) => theme.spacing(3, 0)};
  border-radius: 8px;
  font-style: italic;
`;

type TestimonialBoxProps = {
  author: string;
  testimonial: string;
};
export default function TestimonialBox({
  author,
  testimonial,
}: TestimonialBoxProps) {
  return (
    <StyledBox>
      <Typography variant="body1">"{testimonial}"</Typography>

      <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
        — {author}
      </Typography>
    </StyledBox>
  );
}
