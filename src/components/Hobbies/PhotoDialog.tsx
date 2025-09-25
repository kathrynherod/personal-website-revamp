import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, IconButton, styled } from "@mui/material";

import type { Photo } from "../../types/HobbiesTypes";

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
  position: absolute;
  right: 8px;
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
  onClose: () => void;
  open: boolean;
  photo: Photo | null;
};

export default function PhotoDialog({
  photo,
  open,
  onClose,
}: PhotoDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false} fullWidth data-testid="photo-dialog">
      <DialogContentContainer data-testid="dialog-content">
        <CloseButton onClick={onClose} data-testid="close-button">
          <CloseIcon />
        </CloseButton>
        {photo && (
          <FullSizeImage
            src={photo.src}
            alt={photo.caption}
            data-testid="dialog-image"
          />
        )}
      </DialogContentContainer>
    </StyledDialog>
  );
}
