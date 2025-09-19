import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, styled, Typography } from "@mui/material";

const FooterContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  margin-top: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4, 2)};
` as typeof Box;

const FooterContent = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
    justify-content: space-between;
  }
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
` as typeof IconButton;

const FooterText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    text-align: left;
  }
`;

const ContactInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    align-items: flex-end;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer component="footer">
      <FooterContent>
        <FooterText variant="body2">
          © {currentYear} Kathryn Herod. Built with React & TypeScript.
        </FooterText>

        <SocialLinks>
          <SocialIconButton
            component="a"
            href="https://linkedin.com/in/kathrynherod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon />
          </SocialIconButton>

          <SocialIconButton
            component="a"
            href="https://github.com/kathrynherod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <GitHubIcon />
          </SocialIconButton>

          <SocialIconButton
            component="a"
            href="mailto:kathryn.herod@gmail.com?subject=Your website caught my eye"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send Email"
          >
            <EmailIcon />
          </SocialIconButton>
        </SocialLinks>

        <ContactInfo>
          <Typography variant="body2" color="text.secondary">
            Katy, Texas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available for new opportunities
          </Typography>
        </ContactInfo>
      </FooterContent>
    </FooterContainer>
  );
}
