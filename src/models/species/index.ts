import { type Names } from "../name";
import { type APIResource } from "./../api-resource";
import { type Descriptions } from "./../description";
import { type NamedAPIResource } from "./../named-api-resource";
import { type SpeciesDexEntries } from "./dex-entry";
import { type FlavorTexts } from "./flavor-text";
import { type Genera } from "./genus";
import { type PalParkEncounterAreas } from "./pal-park-encounter-area";
import { type SpeciesVarieties } from "./variety";

export interface Species {
  id?: number;
  name?: string;
  order?: number;
  genderRate?: number;
  captureRate?: number;
  baseHappiness?: number;
  isBaby?: boolean;
  isLegendary?: boolean;
  isMythical?: boolean;
  hatchCounter?: number;
  hasGenderDifferences?: boolean;
  formsSwitchable?: boolean;
  growthRate?: NamedAPIResource;
  pokedexNumbers?: SpeciesDexEntries;
  eggGroups?: NamedAPIResource[];
  color?: NamedAPIResource;
  shape?: NamedAPIResource;
  evolvesFromSpecies?: NamedAPIResource;
  evolutionChain?: APIResource;
  habitat?: NamedAPIResource;
  generation?: NamedAPIResource;
  names?: Names;
  palParkEncounters?: PalParkEncounterAreas;
  flavorTextEntries?: FlavorTexts;
  formDescriptions?: Descriptions;
  genera?: Genera;
  varieties?: SpeciesVarieties;
}
