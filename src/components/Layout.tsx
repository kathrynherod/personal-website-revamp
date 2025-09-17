import { Box, styled } from "@mui/material";
import type { ReactNode } from "react";

const PageContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(4, 2)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1200px;
  padding: 1rem 2rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: 2rem 4rem;
  }
`;
export default function Layout({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <PageContainer>
      <ContentWrapper id={id}>{children}</ContentWrapper>
    </PageContainer>
  );
}
