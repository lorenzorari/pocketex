'use client';

import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import ClientOnlyPortal from '@/components/ClientOnlyPortal';
import { CommandDialog } from '@/components/Command';
import Search from '@/components/search/Search';
import { cn } from '@/utils/classnames';

interface Props {
  children: (props: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => React.ReactNode;
}

export default function SearchDialog({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen((open) => !open);
    }
  });

  return (
    <>
      {children({ isOpen, setIsOpen })}

      <ClientOnlyPortal selector="body">
        <div
          className={cn('absolute inset-0 opacity-0 backdrop-blur-xl transition-opacity duration-200', {
            'z-50 opacity-100': isOpen,
          })}
        >
          <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
            <Search />
          </CommandDialog>
        </div>
      </ClientOnlyPortal>
    </>
  );
}
