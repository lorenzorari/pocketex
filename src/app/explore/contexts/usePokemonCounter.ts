import { createContext, useContext } from 'react';

export type PokemonCounter = Record<string, number>;

type Context = {
  pokemonCount: PokemonCounter;
  setPokemonCount: React.Dispatch<React.SetStateAction<PokemonCounter>>;
};

export const PokemonCounterContext = createContext<Context>({
  pokemonCount: {},
  setPokemonCount: () => {},
});

export const usePokemonCounter = () => useContext(PokemonCounterContext);
