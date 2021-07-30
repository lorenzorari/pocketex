import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ReactSVG } from 'react-svg';
import { Pokemon } from '../../../models/pokemon';
import PokemonCardId from '../../components/pokemon/card/id';
import PokemonCardImage from '../../components/pokemon/card/image';
import PokemonCardTitle from '../../components/pokemon/card/title';
import PokemonDetailsBiography from '../../components/pokemon/details/biography';
import Tab from '../../components/tab';
import TypeTag from '../../components/type-tag';
import { getPokemon } from '../../services/pokemon';
import styles from './pokemon-details.module.scss';

interface Params {
  id: string;
}

const BIOGRAPHY = 'biography';
const STATS = 'stats';
const EVOLUTIONS = 'evolutions';

const detailsView = { [BIOGRAPHY]: <PokemonDetailsBiography /> };

const PokemonDetails = () => {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [activeTab, setActiveTab] = useState<string>(BIOGRAPHY);

  const pokemonType = pokemon?.types[0].type.name;

  const style = {
    '--color-type-1': `var(--color-${pokemonType}-1)`,
    '--color-type-2': `var(--color-${pokemonType}-2)`,
  } as React.CSSProperties;

  const styleTypeTag = {
    padding: '.5rem',
    margin: '.5rem .5rem 0 0',
  };

  useEffect(() => {
    const init = async () => {
      const data = await getPokemon(id);
      setPokemon(data);
    };

    init();
  });

  return (
    <main style={style} className={styles.main}>
      {pokemon && (
        <>
          <div className={styles['basic-info-container']}>
            <div className={styles['basic-info']}>
              <PokemonCardTitle pokemon={pokemon} />
              <PokemonCardId pokemon={pokemon} />
              <TypeTag style={styleTypeTag} value={pokemonType} />
            </div>

            <figure className={styles['pokemon-image']}>
              <PokemonCardImage pokemon={pokemon} />
            </figure>

            <ReactSVG
              className={styles['background-image']}
              src={`/assets/${pokemonType}.svg`}
            />
          </div>

          <div className={styles['details-container']}>
            <ul className={styles['details-tabs']}>
              <Tab
                onClick={() => setActiveTab(BIOGRAPHY)}
                isActive={activeTab === BIOGRAPHY}
              >
                Biography
              </Tab>
              <Tab
                onClick={() => setActiveTab(STATS)}
                isActive={activeTab === STATS}
              >
                Stats
              </Tab>
              <Tab
                onClick={() => setActiveTab(EVOLUTIONS)}
                isActive={activeTab === EVOLUTIONS}
              >
                Evolutions
              </Tab>
            </ul>

            {detailsView[activeTab]}
          </div>
        </>
      )}
    </main>
  );
};

export default PokemonDetails;
