import { BUTTON_VARIATIONS } from "./../../config/variation";
import "./Button.css";

const variationToClassMap = {
  [BUTTON_VARIATIONS.textOnly]: "text-button",
  [BUTTON_VARIATIONS.default]: "button",
};

export default function Button({
  children,
  variation,
  classOverrides,
  ...props
}) {
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
}
