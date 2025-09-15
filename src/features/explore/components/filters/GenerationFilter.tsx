'use client';

import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/select';
import { type GenerationListItem } from '@/services/generations';

interface Props {
  generations: GenerationListItem[];
  onValueChange?: (value: string) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export const defaultValue: SelectOption = {
  label: 'All generations',
  value: '0',
};

export function GenerationFilter({ generations, onValueChange }: Props) {
  const [selectedGeneration, setSelectedGeneration] = useState<SelectOption>(defaultValue);

  const options: SelectOption[] = [
    defaultValue,
    ...generations.map(({ label, id }) => ({
      label,
      value: String(id),
    })),
  ];

  const handleClickGeneration = (value: string) => {
    const gen = options.find((option) => option.value === value);

    setSelectedGeneration(gen || defaultValue);

    if (onValueChange) {
      onValueChange(value);
    }
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
