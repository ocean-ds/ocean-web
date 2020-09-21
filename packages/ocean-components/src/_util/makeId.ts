/**
 * Joins strings to format IDs for compound components.
 *
 * @param args
 */
const makeId = (...args: (string | number | null | undefined)[]): string =>
  args.filter((val) => val != null).join('--');

export default makeId;
