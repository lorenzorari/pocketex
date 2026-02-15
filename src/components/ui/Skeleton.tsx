import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

export function Skeleton({ children, className }: BaseComponentWithChildren) {
  return <div className={cn('bg-muted-background animate-pulse', className)}>{children}</div>;
}
