import { Paper, styled, Typography } from "@mui/material";

const BlockquoteContainer = styled(Paper)`
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-left: 4px solid;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;
  margin: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

type BlockquoteProps = {
  children: React.ReactNode;
  author?: string;
};

export default function Blockquote(props: BlockquoteProps) {
  const { children, author } = props;

  return (
    <BlockquoteContainer>
      <Typography component="blockquote" variant="body1" gutterBottom>
        {children}
      </Typography>
      {author && (
        <Typography variant="caption" display="block">
          — {author}
        </Typography>
      )}
    </BlockquoteContainer>
  );
}
