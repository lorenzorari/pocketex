import React, { forwardRef, type JSX, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  observerCallback: IntersectionObserverCallback;
  loaderElement: JSX.Element;
}

const InfiniteScroll = forwardRef(({ children, observerCallback, loaderElement }: Props, ref: any) => {
  const Loader = () => loaderElement;

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);

    if (ref?.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, observerCallback]);

  return (
    <>
      {children}
      <Loader />
    </>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
