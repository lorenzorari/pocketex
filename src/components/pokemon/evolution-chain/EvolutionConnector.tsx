import { cn } from '@/utils/classnames';

interface Props {
  children?: React.ReactNode;
  isFirstChild?: boolean;
}

export function EvolutionConnector({ children, isFirstChild = false }: Props) {
  return (
    <>
      <div className="-left-evochain-col-mobile w-evochain-col-mobile before:w-evoconnector-thickness before:bg-muted-background after:h-evoconnector-thickness after:bg-muted-background md:-left-evochain-col md:w-evochain-col absolute top-0 -z-10 flex h-full items-center before:absolute before:bottom-1/2 before:h-[calc(100%+var(--gap-evochain-row))] after:absolute after:inset-x-0 after:rounded-l-full md:before:content-none md:after:rounded-none">
        <div className="relative flex size-full items-center justify-center">{children}</div>
      </div>
      <div
        className={cn(
          !isFirstChild &&
            'md:-ml-evochain-col md:before:h-evoconnector-thickness md:before:bg-muted-background md:after:w-evoconnector-thickness md:after:bg-muted-background md:absolute md:top-0 md:-left-full md:-z-10 md:flex md:h-full md:w-full md:items-center md:justify-end md:before:absolute md:before:w-1/2 md:before:rounded-l-full md:after:absolute md:after:bottom-1/2 md:after:left-1/2',
          'md:after:h-[calc(100%+var(--gap-evochain-row))]',
        )}
      ></div>
    </>
  );
}
