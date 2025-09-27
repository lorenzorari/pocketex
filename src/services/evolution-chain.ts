import { pokeapiOld } from '@/helpers/http';
import { type EvolutionChain } from '@/models/evolution/chain';

const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  return await pokeapiOld.get(url).json<EvolutionChain>();
};

export { getEvolutionChain };
