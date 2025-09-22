import { Box, styled } from "@mui/material";

export const AnimatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease;
`;