/**
 * A generic type that receives two arguments: the name of the element, and an object with custom properties.
 */
export type MergeElementProps<
  T extends React.ElementType,
  P extends Record<string, unknown>
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;
