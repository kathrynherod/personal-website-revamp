import { Box, styled, Typography } from "@mui/material";
import type { ReactNode } from "react";

const PageContainer = styled("section")`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4, 2)};
`;

const SectionWrapper = styled(Box)`
  max-width: 1200px;
  padding: 1rem 2rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: 2rem 4rem;
  }
`;

const SectionTile = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(2)} 0;
`;

export default function Layout({
  children,
  id,
  sectionTitle,
}: {
  children: ReactNode;
  id: string;
  sectionTitle: string;
}) {
  return (
    <PageContainer id={id}>
      <SectionWrapper>
        <SectionTile variant="h2">{sectionTitle}</SectionTile>
        {children}
      </SectionWrapper>
    </PageContainer>
  );
}
