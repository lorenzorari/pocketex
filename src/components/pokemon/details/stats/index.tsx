import Stat from '@/components/stat';
import { Pokemon } from '@/models/pokemon';
import { replaceDashesBySpaces } from '@/utils/replace-dash-by-space';
import styles from './stats.module.scss';

interface Props {
  pokemon: Pokemon;
}

const PokemonDetailsStats = ({ pokemon }: Props) => {
  const stats = pokemon.stats?.map(({ stat, baseStat }) => {
    const statName = replaceDashesBySpaces(stat?.name ?? "");
    return { title: statName, value: baseStat };
  });

  return (
    <section className={styles["stats-container"]}>
      {stats?.map((stat, i) => (
        <Stat
          key={i}
          title={stat.title === "hp" ? "HP" : stat.title}
          value={stat.value!}
        />
      ))}
    </section>
  );
};

export default PokemonDetailsStats;
