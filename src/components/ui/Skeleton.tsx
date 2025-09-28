import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

export function Skeleton({ children, className }: BaseComponentWithChildren) {
  return <div className={cn('animate-pulse bg-gray-200/75', className)}>{children}</div>;
}
