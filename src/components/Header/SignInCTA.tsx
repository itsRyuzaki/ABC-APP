import Button from "@mui/material/Button";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 'max-content',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const SignInCTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          borderColor: "divider",
          color: "text.primary",
          "&:hover": {
            borderColor: "primary.main",
            color: "primary.main",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Sign In
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="s"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AuthForm closeModal={() => setOpen(false)} />
        </Box>
      </Modal>
    </>
  );
};

export default SignInCTA;
