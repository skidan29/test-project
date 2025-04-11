import { Box, Modal } from "@mui/material";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export function CreationModal({ isOpen, close }: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'>
      <Box sx={{ ...style, width: 400 }}>
        <h2 id='parent-modal-title'>Text in a modal</h2>
        <p id='parent-modal-description'>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </Box>
    </Modal>
  );
}
