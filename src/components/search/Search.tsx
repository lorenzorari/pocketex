'use client';

import { IconSearch } from '@tabler/icons-react';
import { Command, CommandEmpty, CommandHeader, CommandInput, CommandList, CommandLoading } from '@/components/Command';
import { useSearch } from '@/components/search/hooks/useSearch';
import { PokemonGroup } from '@/components/search/PokemonGroup';

export default function Search() {
  const {
    isFetchingPokemon,
    filteredPokemons,
    query,
    setQuery,
    recentSearches,
    handleSelect,
    showRecentSearches,
    showPokemonGroup,
    showNoResults,
  } = useSearch();

  return (
    <Command label="Search" shouldFilter={false}>
      <CommandHeader className="flex items-center gap-2">
        <IconSearch className="size-4 text-gray-400" />
        <CommandInput placeholder="Search a Pokémon by name or id..." value={query} onValueChange={setQuery} />
      </CommandHeader>
      <CommandList>
        {isFetchingPokemon && query && <CommandLoading />}
        {showNoResults && <CommandEmpty>No results found</CommandEmpty>}

        {!query && recentSearches.length === 0 && <CommandEmpty>No recent searches</CommandEmpty>}

        {showRecentSearches && (
          <PokemonGroup pokemons={recentSearches} groupTitle="Recent searches" handleSelect={handleSelect} />
        )}

        {showPokemonGroup && (
          <PokemonGroup pokemons={filteredPokemons} groupTitle="Pokémon" handleSelect={handleSelect} />
        )}
      </CommandList>
    </Command>
  );
}
