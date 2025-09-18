import { Chip, styled } from "@mui/material";

const StyledChip = styled(Chip)`
  background-color: ${({ theme }) => theme.palette.primary.light}20;
  border: 1px solid ${({ theme }) => theme.palette.primary.main}40;
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
  font-size: 0.8rem;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.palette.primary.main}15,
      transparent
    );
    content: "";
    height: 100%;
    left: -100%;
    position: absolute;
    top: 0;
    width: 100%;

    transition: left 0.4s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main}12;
    border-color: ${({ theme }) => theme.palette.primary.main}70;
    box-shadow: 0 2px 6px ${({ theme }) => theme.palette.primary.main}12;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  @keyframes chipPulse {
    0% {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.primary.main}30;
    }
    70% {
      box-shadow: 0 0 0 4px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  &.animate-in {
    animation: chipPulse 1.2s ease-out;
  }
`;
type SkillChipProps = {
  skill: string;
  index: number;
  isVisible: boolean;
};

export default function SkillChip({ skill, index, isVisible }: SkillChipProps) {
  return (
    <StyledChip
      label={skill}
      variant="outlined"
      className={isVisible ? "animate-in" : ""}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    />
  );
}
