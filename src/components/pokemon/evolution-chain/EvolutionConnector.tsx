import { cn } from 'src/utils/classnames';

interface Props {
  children?: React.ReactNode;
  isFirstChild?: boolean;
}

export function EvolutionConnector({ children, isFirstChild = false }: Props) {
  return (
    <>
      <div className="after:h-evoconnector-thickness after:bg-evonode-primary -left-evochain-col w-evochain-col absolute top-0 -z-10 flex h-full items-center after:absolute after:inset-x-0">
        <div className="relative flex size-full items-center justify-center">{children}</div>
      </div>
      <div
        className={cn(
          !isFirstChild &&
            '-ml-evochain-col before:h-evoconnector-thickness after:w-evoconnector-thickness before:bg-evonode-primary after:bg-evonode-primary absolute -left-full top-0 -z-10 flex h-full w-full items-center justify-end before:absolute before:w-1/2 before:rounded-l-full after:absolute after:bottom-1/2 after:left-1/2',
          'after:h-[calc(100%+var(--gap-evochain-row))]',
        )}
      ></div>
    </>
  );
}
