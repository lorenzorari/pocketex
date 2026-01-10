'use client';

import { useState } from 'react';
import { useEventListener, useScrollLock } from 'usehooks-ts';
import { ClientOnlyPortal } from '@/components/ClientOnlyPortal';
import { CommandDialog } from '@/components/Command';
import { Overlay } from '@/components/dialog/Overlay';
import Search from '@/components/search/Search';
import { cn } from '@/utils/classnames';

interface Props {
  withTransparentOverlay?: boolean;
  children(props: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }): React.ReactNode;
}

export default function SearchDialog({ children, withTransparentOverlay = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { lock, unlock } = useScrollLock({ autoLock: false });

  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleOpenChange(!isOpen);
    }
  });

  function handleOpenChange(newValue: boolean) {
    const lockAction = newValue ? lock : unlock;

    lockAction();
    setIsOpen(newValue);
  }

  return (
    <>
      {children({ isOpen, setIsOpen })}

      <ClientOnlyPortal selector="body">
        <Overlay
          id="search-dialog-overlay"
          className={cn('opacity-0', { 'z-50 opacity-100': isOpen })}
          isTransparent={withTransparentOverlay}
        >
          <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
            <Search />
          </CommandDialog>
        </Overlay>
      </ClientOnlyPortal>
    </>
  );
}
