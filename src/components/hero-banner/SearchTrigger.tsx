import { IconSearch } from '@tabler/icons-react';
import SearchDialog from '@/features/search/SearchDialog';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

interface Props {
  isIcon?: boolean;
  withTransparentOverlay?: boolean;
}

export function SearchTrigger({ isIcon = false, className, withTransparentOverlay = false }: BaseComponent<Props>) {
  return (
    <SearchDialog withTransparentOverlay={withTransparentOverlay}>
      {({ onOpenChange }) => (
        <button
          className={cn(
            'flex grow items-center gap-2 rounded-full',
            {
              'dark:bg-muted-background text-muted-foreground bg-white px-5 py-2 text-left': !isIcon,
            },
            {
              'group hover:text-foreground text-muted-foreground md:hover:border-foreground md:border-border rounded-md p-1.5 transition md:rounded-full md:border md:px-3 md:py-1.5':
                isIcon,
            },
            className,
          )}
          type="button"
          onClick={() => onOpenChange(true)}
        >
          <IconSearch
            stroke={1.2}
            className={cn('group transition', { 'size-4': !isIcon }, { 'size-5 md:size-4': isIcon })}
          />
          {!isIcon && <span>Search a Pokémon</span>}
          <kbd className="hidden md:ml-auto md:block md:font-sans md:text-xs">⌘K</kbd>
        </button>
      )}
    </SearchDialog>
  );
}
