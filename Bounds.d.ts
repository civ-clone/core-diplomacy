/**
 * The range a value is kept in. Either end may be left open; with neither, any number is kept as it is.
 */
export interface Bounds {
  maximum?: number;
  minimum?: number;
}
export declare const assertBounds: ({ maximum, minimum }: Bounds) => void;
export declare const clamp: (
  value: number,
  { maximum, minimum }: Bounds
) => number;
export default clamp;
