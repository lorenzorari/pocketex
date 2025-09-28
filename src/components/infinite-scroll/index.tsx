import React, { type RefObject, useEffect } from 'react';
import { Loader } from '@/components/ui/Loader';

interface Props {
  children: React.ReactNode;
  observerCallback: IntersectionObserverCallback;
  isLoading?: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const InfiniteScroll = ({ children, observerCallback, isLoading = false, ref }: Props) => {
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);

    if (ref?.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, observerCallback]);

  return (
    <>
      {children}
      {isLoading && (
        <div ref={ref} className="mb-8 flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
