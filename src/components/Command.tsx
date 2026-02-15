import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Command as CommandPrimitive } from 'cmdk';
import { type ComponentProps } from 'react';
import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

const Command = ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      'bg-background border-border flex w-full flex-col overflow-hidden rounded-[calc(6px+8px)] border',
      className,
    )}
    {...props}
  />
);

const CommandHeader = ({ className, ...props }: BaseComponentWithChildren) => (
  <div className={cn('border-b-border border-b px-5', className)} {...props} />
);

const CommandInput = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) => (
  <CommandPrimitive.Input
    className={cn('placeholder:text-muted-foreground w-full rounded-md py-3 outline-none', className)}
    {...props}
  />
);

const CommandList = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn('overflow-auto p-2', className)} {...props} />
);

const CommandEmpty = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className={cn('px-3 py-2', className)} {...props} />
);

const CommandGroup = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      '[&>[cmdk-group-heading]]:text-muted-foreground not-last:mb-4 [&>[cmdk-group-heading]]:mb-1 [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:text-sm',
      className,
    )}
    {...props}
  />
);

const CommandItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      'text-muted-foreground data-[selected=true]:bg-muted-background data-[selected=true]:text-foreground cursor-pointer rounded-md px-3 py-2 select-none',
      className,
    )}
    {...props}
  />
);

const CommandSubItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandItem
    className={cn(
      'before:bg-muted-background relative ml-11 before:absolute before:-left-5 before:w-[1px] not-first:before:inset-y-0 first:before:top-1 first:before:bottom-0 last:before:bottom-1',
      className,
    )}
    {...props}
  />
);

const CommandLoading = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Loading>) => {
  props.children = props.children ?? 'Loading...';

  return <CommandPrimitive.Loading className={cn('px-3 py-2', className)} {...props} />;
};

const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog {...props}>
      <VisuallyHidden asChild>
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
      </VisuallyHidden>
      <DialogContent
        className={cn(
          'absolute inset-x-4 top-4 flex max-h-[90%] overflow-hidden md:top-[10%] md:mx-auto md:max-h-[80%] md:w-full md:max-w-2xl',
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export {
  Command,
  CommandHeader,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandLoading,
  CommandSubItem,
  CommandDialog,
};
