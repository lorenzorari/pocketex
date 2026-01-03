import { IconSearch } from '@tabler/icons-react';
import SearchDialog from '@/components/search/SearchDialog';

export function SearchTrigger() {
  return (
    <SearchDialog>
      {({ setIsOpen }) => (
        <button
          className="flex grow items-center gap-2 rounded-full bg-white px-5 py-2 text-left text-gray-400"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <IconSearch className="size-4 text-gray-400" />
          Search a Pokémon
          <kbd className="ml-auto font-sans text-xs">⌘K</kbd>
        </button>
      )}
    </SearchDialog>
  );
}
