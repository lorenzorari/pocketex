import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

type Props = BaseComponentWithChildren;

export const PanelLabel = ({ children, className }: Props) => {
  return <span className={cn('text-muted-foreground', className)}>{children}</span>;
};
