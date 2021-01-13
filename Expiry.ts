import { Turn, ITurn } from '@civ-clone/core-turn-based-game/Turn';

export interface IExpiry extends ITurn {
  increment(): number;
}

export class Expiry extends Turn implements IExpiry {
  increment(): number {
    throw new TypeError('Cannot increment Expiry');
  }
}

export default Expiry;
