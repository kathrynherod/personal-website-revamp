import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, IconButton, styled } from "@mui/material";

import type { Photo } from "../../pages/Hobbies";

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    max-height: 90vh;
    max-width: 90vw;
  }
`;

const DialogContentContainer = styled(DialogContent)`
  padding: 0;
  position: relative;
`;

const CloseButton = styled(IconButton)`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  right: 8px;
  position: absolute;
  top: 8px;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const FullSizeImage = styled("img")`
  display: block;
  height: auto;
  width: 100%;
`;

type PhotoDialogProps = {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
};

export default function PhotoDialog({
  photo,
  open,
  onClose,
}: PhotoDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false} fullWidth>
      <DialogContentContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {photo && <FullSizeImage src={photo.src} alt={photo.caption} />}
      </DialogContentContainer>
    </StyledDialog>
  );
}
