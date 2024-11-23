import { motion } from "framer-motion";
import "./Spinner.css";

export function Spinner({ divStyle }) {
  const spinTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    duration: 1.5,
  };
  return (
    <>
      <motion.div
        className="spinner-container"
        style={divStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
      </motion.div>
    </>
  );
}
 