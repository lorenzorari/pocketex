import { BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

type Props = BaseComponentWithChildren;

export const PanelLabel = ({ children, className }: Props) => {
  return <span className={cn('text-gray-400', className)}>{children}</span>;
};
