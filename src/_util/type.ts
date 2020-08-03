export type MergeProps<
  T extends React.ElementType,
  P extends Record<string, unknown>
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;
