import { SVG } from 'src/components/SVG';
import { BaseComponent } from 'src/models/utils';
import { cn } from 'src/utils/classnames';

type Props = BaseComponent;

export function Logo({ className }: Props) {
  return <SVG className={cn(className)} src="/assets/svg/logo.svg" />;
}
