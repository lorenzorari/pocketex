'use client';

import { type ImgHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/ui/Loader';
import { cn } from '@/utils/classnames';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export const Image = (props: Props) => {
  const { className, ...imgProps } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center justify-center text-white">
          <Loader />
        </div>
      )}
      <img
        ref={imgRef}
        className={cn(
          'transition-opacity duration-500',
          { 'opacity-0': isLoading, 'opacity-100': !isLoading },
          className,
        )}
        onLoad={handleLoad}
        {...imgProps}
      />
    </>
  );
};
