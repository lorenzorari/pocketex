import React, { useState } from 'react';
import { getArtworkUrl } from '../../../helpers/get-artwork-url';
import styles from './card.module.scss';
import PokemonCardId from './id';
import PokemonCardImage from './image';
import PokemonCardTitle from './title';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <PokemonCardTitle pokemon={pokemon} />

      <PokemonCardId pokemon={pokemon} />

      <figure className={styles.figure}>
        <PokemonCardImage pokemon={pokemon} />
      </figure>

      <div className={styles['type-container']}>
        <div className={styles.type}>{pokemon?.types[0].type.name}</div>
      </div>
    </div>
  );
};

export default PokemonCard;
