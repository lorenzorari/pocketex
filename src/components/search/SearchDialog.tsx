'use client';

import { useState } from 'react';
import { useEventListener, useScrollLock } from 'usehooks-ts';
import ClientOnlyPortal from '@/components/ClientOnlyPortal';
import { CommandDialog } from '@/components/Command';
import Search from '@/components/search/Search';
import { cn } from '@/utils/classnames';

interface Props {
  children: (props: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => React.ReactNode;
}

export default function SearchDialog({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { lock, unlock, isLocked } = useScrollLock({ autoLock: false });

  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const newIsOpen = !isOpen;

      if (newIsOpen) lock();
      else unlock();

      setIsOpen(newIsOpen);
    }
  });

  function handleOpenChange(value: boolean) {
    const newIsOpen = !value;

    if (newIsOpen) lock();
    else unlock();

    setIsOpen(newIsOpen);
  }

  return (
    <>
      {children({ isOpen, setIsOpen })}

      <ClientOnlyPortal selector="body">
        <div
          className={cn('absolute inset-0 opacity-0 backdrop-blur-xl transition-opacity duration-200', {
            'z-50 opacity-100': isOpen,
          })}
        >
          <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
            <Search />
          </CommandDialog>
        </div>
      </ClientOnlyPortal>
    </>
  );
}
