import useSWR from 'swr';
import { getGenerations } from '@/services/generations';
import { capitalize } from '@/utils/capitalize';

export function useGenerations() {
  const { data, isLoading } = useSWR(`generations`, () => getGenerations());

  function formatGenerationName(name: string) {
    const template = new RegExp('^generation-.+$');

    if (!template.test(name)) {
      console.error('Invalid generation name', name);
      return 'Generation-???';
    }

    const [label, generationNumber] = name.split('-');

    return `${capitalize(label)} ${generationNumber.toUpperCase()}`;
  }

  return {
    generations: data,
    areGenerationsLoading: isLoading,
    formatGenerationName,
  };
}
