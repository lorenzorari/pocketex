export type BaseComponent<T = object> = T & {
  className?: string;
};

export type WithChildren = {
  children?: React.ReactNode;
};

export type BaseComponentWithChildren<T = object> = BaseComponent<T> & WithChildren;

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;
