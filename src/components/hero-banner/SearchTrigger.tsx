import { IconSearch } from '@tabler/icons-react';
import SearchDialog from '@/components/search/SearchDialog';
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
            'dark:bg-muted-background text-muted-foreground flex grow items-center gap-2 rounded-full bg-white px-5 py-2 text-left',
            {
              'group hover:text-foreground dark:text-muted-foreground bg-transparent p-0 transition md:border md:border-gray-200 md:px-3 md:py-1.5 md:hover:border-gray-400 dark:bg-transparent dark:md:border-gray-500':
                isIcon,
            },
            className,
          )}
          type="button"
          onClick={() => onOpenChange(true)}
        >
          <IconSearch className="text-muted-foreground size-4 transition group-hover:text-inherit" />
          {!isIcon && <span>Search a Pokémon</span>}
          <kbd className="hidden md:ml-auto md:block md:font-sans md:text-xs">⌘K</kbd>
        </button>
      )}
    </SearchDialog>
  );
}
