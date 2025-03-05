
import { createContext, useContext } from 'react';
import { PokemonType } from '@/models/types';
import { Nullable } from '@/models/utils';

type PrimaryTypeContext = Nullable<PokemonType>;

export const PrimaryTypeCtx = createContext<PrimaryTypeContext>(null);

export const usePrimaryType = () => useContext(PrimaryTypeCtx);
