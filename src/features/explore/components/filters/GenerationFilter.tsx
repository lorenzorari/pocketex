'use client';

import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/select';

interface Props {
  generations: string[];
}

interface SelectOption {
  label: string;
  value: string;
}

const defaultValue: SelectOption = {
  label: 'All generations',
  value: 'All',
};

export function GenerationFilter({ generations }: Props) {
  const [selectedGeneration, setSelectedGeneration] = useState<SelectOption>(defaultValue);

  const options: SelectOption[] = [
    defaultValue,
    ...generations.map((generation) => ({
      label: generation,
      value: generation,
    })),
  ];

  const handleClickGeneration = (value: string) => {
    const gen = options.find((option) => option.value === value);

    setSelectedGeneration(gen || defaultValue);
  };

  return (
    <>
      <Select defaultValue={selectedGeneration.value} onValueChange={handleClickGeneration}>
        <SelectTrigger>
          <SelectValue>{selectedGeneration.label}</SelectValue>
        </SelectTrigger>
        <SelectContent className="px-1">
          {options?.map((option) => (
            <SelectItem className="select-none hover:bg-black hover:text-white" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
