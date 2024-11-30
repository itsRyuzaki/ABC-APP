import { FC, forwardRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface IModalComponent {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = forwardRef<
  HTMLDialogElement,
  IModalComponent
>(({ children, onClose }, ref) => {
  return createPortal(
    <motion.dialog onClose={onClose} ref={ref}>
      {children}
    </motion.dialog>,
    document.getElementById("modal-container") as Element
  );
});

export default Modal;
