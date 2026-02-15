import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

type Props = BaseComponentWithChildren;

export const PanelField = ({ children, className }: Props) => {
  return <div className={cn('border-b-border border-b py-[10px] last:border-b-0', className)}>{children}</div>;
};
