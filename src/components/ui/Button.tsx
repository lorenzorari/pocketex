import Link, { type LinkProps } from 'next/link';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/classnames';

export enum ButtonVariant {
  Dark = 'dark',
  Outline = 'outline',
  Menu = 'menu',
}

enum Size {
  MD = 'md',
  Icon = 'icon',
}

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type CustomButtonProps = AnchorProps | ButtonProps;

type Props = CustomButtonProps & {
  variant?: `${ButtonVariant}`;
  size?: `${Size}`;
};

const VARIANTS = {
  [ButtonVariant.Dark]: 'bg-foreground text-background border-2 border-transparent',
  [ButtonVariant.Outline]: 'border-2 border-foreground hover:bg-foreground hover:text-background',
  [ButtonVariant.Menu]: 'hover:text-foreground text-muted-foreground inline-flex transition-all',
};

const SIZES = {
  [Size.MD]: 'px-[14px] py-[2px]',
  [Size.Icon]: 'p-1',
};

function isAnchor(props: CustomButtonProps): props is AnchorProps {
  return (props as AnchorProps).href !== undefined;
}

export function Button(props: Props) {
  const { variant = ButtonVariant.Dark, size = Size.MD, className: cls, ...restProps } = props;
  const baseClass = 'rounded-full font-bold transition-colors';
  const variantClass = VARIANTS[variant];
  const sizeClass = SIZES[size];
  const mixedClasses = [baseClass, variantClass, sizeClass, cls];

  if (isAnchor(restProps)) {
    const { href, ...anchorProps } = restProps;
    return <Link href={href as string} className={cn('inline-block', mixedClasses)} {...anchorProps} />;
  }

  return <button className={cn(mixedClasses)} {...(restProps as ButtonProps)} />;
}
