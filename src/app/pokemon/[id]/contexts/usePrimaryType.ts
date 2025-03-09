
import { createContext, useContext } from 'react';
import { type PokemonType } from '@/models/types';
import { type Nullable } from '@/models/utils';

type PrimaryTypeContext = Nullable<PokemonType>;

export const PrimaryTypeCtx = createContext<PrimaryTypeContext>(null);

export const usePrimaryType = () => useContext(PrimaryTypeCtx);
