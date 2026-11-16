/**
 * The range a value is kept in. Either end may be left open; with neither, any number is kept as it is.
 */
export interface Bounds {
  maximum?: number;
  minimum?: number;
}

// Throws when the range is empty: a minimum above the maximum keeps no number.
export const assertBounds = ({ maximum, minimum }: Bounds): void => {
  if (maximum !== undefined && minimum !== undefined && minimum > maximum) {
    throw new RangeError(
      `The minimum (${minimum}) is above the maximum (${maximum}).`
    );
  }
};

export const clamp = (value: number, { maximum, minimum }: Bounds): number => {
  if (maximum !== undefined && value > maximum) {
    return maximum;
  }

  if (minimum !== undefined && value < minimum) {
    return minimum;
  }

  return value;
};

export default clamp;
