import { FC, lazy, Suspense } from "react";

interface ILazyComponent {
  pathFn: () => Promise<{
    default: () => JSX.Element;
  }>;
}
const LazyComponent: FC<ILazyComponent> = ({ pathFn }) => {
  const Component = lazy(pathFn);
  return (
    <Suspense
      fallback={
        <p>
          Ahh, do you have slow internet today? If not, then maybe we are the
          culprit here, click here to submit this issue to us!
        </p>
      }
    >
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
