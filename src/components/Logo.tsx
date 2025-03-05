import { SVG } from '@/components/SVG';
import { BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

type Props = BaseComponent;

export function Logo({ className }: Props) {
  return <SVG className={cn(className)} src="/assets/svg/logo.svg" />;
}
