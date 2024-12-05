import { motion, MotionStyle } from "framer-motion";
import "./Spinner.css";
import { FC, ReactNode } from "react";

interface ISpinnerComponent {
  divStyle: MotionStyle;
  children: ReactNode;
}

const spinTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 1.5,
};

const Spinner: FC<ISpinnerComponent> = ({ divStyle, children }) => {
  return (
    <>
      <motion.div
        className="spinner-container"
        style={divStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={spinTransition}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Spinner;
