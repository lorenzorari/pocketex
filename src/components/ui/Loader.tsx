import { IconLoader2 } from '@tabler/icons-react';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

export const Loader = ({ className }: BaseComponent) => {
  return <IconLoader2 className={cn('animate-spin', className)} />;
};
