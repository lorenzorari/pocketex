import React, { forwardRef, type JSX, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  observerCallback: IntersectionObserverCallback;
  loaderElement: JSX.Element;
  isEnd?: boolean;
}

const InfiniteScroll = forwardRef(({ children, observerCallback, loaderElement, isEnd = false }: Props, ref: any) => {
  const Loader = () => loaderElement;

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);

    if (ref?.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, observerCallback]);

  return (
    <>
      {children}
      {!isEnd && <Loader />}
    </>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
