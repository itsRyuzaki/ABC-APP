import { ButtonHTMLAttributes, FC,  ReactNode } from "react";
import { BUTTON_VARIATIONS } from "../../config/variation";
import "./Button.css";

const variationToClassMap = {
  [BUTTON_VARIATIONS.textOnly]: "text-button",
  [BUTTON_VARIATIONS.default]: "button",
};

interface IButtonComponent {
  children: ReactNode;
  variation: string;
  classOverrides?: string[];
}

const Button: FC<IButtonComponent & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  variation,
  classOverrides,
  ...props
}) => {
  const classes = [
    variationToClassMap[variation] ??
      variationToClassMap[BUTTON_VARIATIONS.default],
    ...(classOverrides ?? []),
  ].join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
