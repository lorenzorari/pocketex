import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Command as CommandPrimitive } from 'cmdk';
import { type ComponentProps } from 'react';
import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

const Command = ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn('h-full bg-gray-800 md:h-auto md:max-h-[90%] md:rounded-[calc(6px+8px)]', className)}
    {...props}
  />
);

const CommandHeader = ({ className, ...props }: BaseComponentWithChildren) => (
  <div className={cn('border-b border-b-gray-600 px-5', className)} {...props} />
);

const CommandInput = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) => (
  <CommandPrimitive.Input
    className={cn('w-full rounded-md py-3 text-white outline-none placeholder:text-gray-400', className)}
    {...props}
  />
);

const CommandList = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn('p-2', className)} {...props} />
);

const CommandEmpty = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className={cn('px-3 py-2', className)} {...props} />
);

const CommandGroup = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      'not-last:mb-4 [&>[cmdk-group-heading]]:mb-1 [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:text-sm [&>[cmdk-group-heading]]:text-gray-400',
      className,
    )}
    {...props}
  />
);

const CommandItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn('cursor-pointer rounded-md px-3 py-2 select-none data-[selected=true]:bg-gray-700', className)}
    {...props}
  />
);

const CommandSubItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandItem
    className={cn(
      'relative ml-11 before:absolute before:-left-5 before:w-[1px] before:bg-gray-500 not-first:before:inset-y-0 first:before:top-1 first:before:bottom-0 last:before:bottom-1 data-[selected=true]:text-white',
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
          'absolute inset-y-0 w-full max-w-3xl md:top-[10%] md:left-1/2 md:h-fit md:-translate-x-1/2',
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
