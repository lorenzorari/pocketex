import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { Image } from '@/components/ui/Image';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

interface Props {
  title: string;
  subtitle: string;
  href: string;
  imgSrc: string;
  direction?: 'left' | 'right';
}

export function SiblingLink({ href, title, subtitle, imgSrc, direction = 'left', className }: BaseComponent<Props>) {
  const isRight = direction === 'right';
  const ArrowIcon = isRight ? IconArrowRight : IconArrowLeft;

  return (
    <Link
      href={href}
      className={cn(
        'group dark:hover:bg-muted-background flex items-center gap-2 rounded-lg px-4 py-2 transition-all hover:bg-gray-200 sm:justify-between',
        { 'justify-end': isRight },
        className,
      )}
    >
      <div className={cn({ 'order-2 text-right': isRight })}>
        <div className="mb-2">
          <h3 className="font-bold md:text-lg">{title}</h3>
          <span className="text-base">{subtitle}</span>
        </div>
        <ArrowIcon className={cn('-ml-[3px] size-5', { '-mr-[3px] ml-auto': isRight })} />
      </div>
      <div className="hidden sm:block sm:size-24 sm:grayscale sm:transition-all sm:group-hover:grayscale-0">
        <Image src={imgSrc} alt={title} />
      </div>
    </Link>
  );
}
