import { IconSearch } from '@tabler/icons-react';
import SearchDialog from '@/components/search/SearchDialog';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

interface Props {
  isIcon?: boolean;
}

export function SearchTrigger({ isIcon = false, className }: BaseComponent<Props>) {
  return (
    <SearchDialog>
      {({ setIsOpen }) => (
        <button
          className={cn(
            'flex grow items-center gap-2 rounded-full bg-white px-5 py-2 text-left text-gray-400',
            {
              'group border border-gray-200 bg-transparent px-3 py-1.5 transition hover:border-gray-400 hover:text-black':
                isIcon,
            },
            className,
          )}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <IconSearch className="size-4 text-gray-400 transition group-hover:text-inherit" />
          {!isIcon && <span>Search a Pokémon</span>}
          <kbd className="ml-auto font-sans text-xs">⌘K</kbd>
        </button>
      )}
    </SearchDialog>
  );
}
