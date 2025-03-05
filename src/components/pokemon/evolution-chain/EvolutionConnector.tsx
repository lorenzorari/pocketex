import { cn } from '@/utils/classnames';

interface Props {
  children?: React.ReactNode;
  isFirstChild?: boolean;
}

export function EvolutionConnector({ children, isFirstChild = false }: Props) {
  return (
    <>
      <div className="absolute -left-evochain-col-mobile top-0 -z-10 flex h-full w-evochain-col-mobile items-center before:absolute before:bottom-1/2 before:h-[calc(100%+var(--gap-evochain-row))] before:w-evoconnector-thickness before:bg-evonode-primary after:absolute after:inset-x-0 after:h-evoconnector-thickness after:rounded-l-full after:bg-evonode-primary md:-left-evochain-col md:w-evochain-col md:before:content-none md:after:rounded-none">
        <div className="relative flex size-full items-center justify-center">{children}</div>
      </div>
      <div
        className={cn(
          !isFirstChild &&
            'md:absolute md:-left-full md:top-0 md:-z-10 md:-ml-evochain-col md:flex md:h-full md:w-full md:items-center md:justify-end md:before:absolute md:before:h-evoconnector-thickness md:before:w-1/2 md:before:rounded-l-full md:before:bg-evonode-primary md:after:absolute md:after:bottom-1/2 md:after:left-1/2 md:after:w-evoconnector-thickness md:after:bg-evonode-primary',
          'md:after:h-[calc(100%+var(--gap-evochain-row))]',
        )}
      ></div>
    </>
  );
}
