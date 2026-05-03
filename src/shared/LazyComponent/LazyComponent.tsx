import { FC, ReactNode, Suspense } from "react";

interface ILazyComponent {
  children: ReactNode;
}
const LazyComponent: FC<ILazyComponent> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <p>
          Ahh, do you have slow internet today? If not, then maybe we are the
          culprit here, click here to submit this issue to us!
        </p>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyComponent;
