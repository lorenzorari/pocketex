import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

type Props = BaseComponentWithChildren & {
  id: string;
};

export function Overlay({ children, className, id }: Props) {
  return (
    <div
      id={id}
      className={cn('fixed inset-0 -z-10 bg-black/25 backdrop-blur-xl transition-opacity duration-200', className)}
    >
      {children}
    </div>
  );
}
