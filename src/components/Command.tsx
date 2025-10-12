import { Command as CommandPrimitive } from 'cmdk';
import { type ComponentProps } from 'react';
import { type BaseComponentWithChildren } from '@/models/utils';
import { cn } from '@/utils/classnames';

const Command = ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive className={cn('rounded-[calc(6px+8px)] bg-gray-800', className)} {...props} />
);

const CommandHeader = ({ className, ...props }: BaseComponentWithChildren) => (
  <div className={cn('border-b border-b-gray-600 px-5', className)} {...props} />
);

const CommandInput = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) => (
  <CommandPrimitive.Input
    className={cn('w-full rounded-md py-3 outline-none placeholder:text-gray-400', className)}
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
  <CommandPrimitive.Item className={cn('rounded-md data-[selected=true]:bg-gray-700', className)} {...props} />
);

const CommandLoading = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Loading>) => {
  props.children = props.children ?? 'Loading...';

  return <CommandPrimitive.Loading className={cn('px-3 py-2', className)} {...props} />;
};

export { Command, CommandHeader, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandLoading };
