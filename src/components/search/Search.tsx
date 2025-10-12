'use client';

import { IconLoader, IconSearch } from '@tabler/icons-react';
import { Command } from 'cmdk';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { type PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';
import { usePokemonAutocomplete } from '@/hooks/pokemon/usePokemonAutocomplete';
import { cn } from '@/utils/classnames';

export default function Search() {
  const router = useRouter();
  const { pokemonAutocompleteItems, isPokemonAutocompleteLoading } = usePokemonAutocomplete();
  const [recentSearches, setRecentSearches] = useLocalStorage<PokemonAutocompleteItem[]>('recentSearches', [], {
    initializeWithValue: false,
  });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [query, setQuery] = useState<string>('');

  const filteredPokemons = useMemo(() => {
    if (!query) return pokemonAutocompleteItems.slice(0, 10);

    const q = query.toLowerCase();
    const filteredItems = pokemonAutocompleteItems.filter(({ name, id }) => {
      if (isNaN(+q)) return name.toLowerCase().includes(q);
      console.log(id, q);

      return id.toString().includes(q);
    });

    return filteredItems.slice(0, 10);
  }, [pokemonAutocompleteItems, query]);

  function handleSelect(suggestion: PokemonAutocompleteItem) {
    handleRecentSearches(suggestion);
    router.push(`/pokemon/${suggestion.name}`);
  }

  function handleRecentSearches(suggestion: PokemonAutocompleteItem) {
    console.log('heyyy', suggestion);

    const newRecentSearches = recentSearches.length === 5 ? recentSearches.slice(0, 4) : recentSearches;
    const alreadyExists = newRecentSearches.findIndex((recentSearch) => recentSearch.id === suggestion.id);

    if (alreadyExists > -1) {
      newRecentSearches.splice(alreadyExists, 1);
    }

    newRecentSearches.unshift(suggestion);
    setRecentSearches(newRecentSearches);
  }

  return (
    <Command className="rounded-[calc(6px+8px)] bg-gray-800" label="Command Menu" shouldFilter={false}>
      <div className="flex items-center gap-2 border-b border-b-gray-600 px-5">
        <IconSearch className="size-4 text-gray-400" />
        <Command.Input
          className="w-full rounded-md py-3 outline-none placeholder:text-gray-400"
          placeholder="Search a Pokémon by name or id..."
          value={query}
          onValueChange={setQuery}
        />
      </div>
      <Command.List className="p-2">
        {isPokemonAutocompleteLoading && query && <Command.Loading className="px-3 py-2">Loading...</Command.Loading>}
        {!isPokemonAutocompleteLoading && query && (
          <Command.Empty className="px-3 py-2">No results found</Command.Empty>
        )}

        <Command.Empty className="px-3 py-2">No recent searches</Command.Empty>

        {!query && recentSearches.length > 0 && (
          <Command.Group
            className="not-last:mb-4 [&>[cmdk-group-heading]]:mb-1 [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:text-sm [&>[cmdk-group-heading]]:text-gray-400"
            heading="Recent searches"
          >
            {recentSearches.map((recentSearch) => (
              <Command.Item
                className="rounded-md data-[selected=true]:bg-gray-700"
                key={`rc-${recentSearch.id}`}
                onSelect={() => handleSelect(recentSearch)}
              >
                <Link href={`/pokemon/${recentSearch.name}`} className="flex gap-2 px-3 py-2">
                  <img
                    src={recentSearch.imageUrl}
                    alt={recentSearch.name}
                    className={cn('w-6', !isImageLoaded && 'hidden')}
                    onLoad={() => setIsImageLoaded(true)}
                  />

                  {!isImageLoaded && <IconLoader className="animate-spin text-gray-300 [animation-duration:1.5s]" />}

                  <div>
                    <span className="capitalize">{recentSearch.name} </span>
                    <span className="text-[10px] text-gray-400">{getPokemonNumber(recentSearch.id)}</span>
                  </div>
                </Link>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {query && filteredPokemons.length > 0 && (
          <Command.Group
            className="[&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:text-sm [&>[cmdk-group-heading]]:text-gray-400"
            heading="Pokémon"
          >
            {filteredPokemons.map((suggestion) => (
              <Command.Item
                onSelect={() => handleSelect(suggestion)}
                className="rounded-md data-[selected=true]:bg-gray-700"
                key={suggestion.id}
              >
                <Link href={`/pokemon/${suggestion.name}`} className="flex gap-2 px-3 py-2">
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.name}
                    className={cn('w-6', !isImageLoaded && 'hidden')}
                    onLoad={() => setIsImageLoaded(true)}
                  />

                  {!isImageLoaded && <IconLoader className="animate-spin text-gray-300 [animation-duration:1.5s]" />}

                  <div>
                    <span className="capitalize">{suggestion.name} </span>
                    <span className="text-[10px] text-gray-400">{getPokemonNumber(suggestion.id)}</span>
                  </div>
                </Link>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
    </Command>
  );
}
