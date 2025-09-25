import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";

const FooterContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  margin-top: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4, 2)};
` as typeof Box;

const FooterContent = styled(Stack)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin: 0 auto;
  max-width: 1200px;
`;

const SocialLinks = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const SocialIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.text.secondary};

  & svg {
    font-size: 1.5rem;
  }

  :hover {
    border-bottom: none;
  }
` as typeof IconButton;

const FooterText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    text-align: left;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer component="footer" data-testid="footer">
      <FooterContent data-testid="footer-content">
        <FooterText variant="body2" data-testid="footer-text">
          © {currentYear} Kathryn Herod. Built with React & TypeScript.
        </FooterText>

        <SocialLinks data-testid="social-links">
          <SocialIconButton
            component="a"
            href="https://linkedin.com/in/kathrynherod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            data-testid="linkedin-link"
          >
            <LinkedInIcon />
          </SocialIconButton>

          <SocialIconButton
            component="a"
            href="https://github.com/kathrynherod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            data-testid="github-link"
          >
            <GitHubIcon />
          </SocialIconButton>

          <SocialIconButton
            component="a"
            href="mailto:kathryn.herod@gmail.com?subject=Your website caught my eye"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send Email"
            data-testid="email-link"
          >
            <EmailIcon />
          </SocialIconButton>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
}
