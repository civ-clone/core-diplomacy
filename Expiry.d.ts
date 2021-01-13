import { Turn, ITurn } from '@civ-clone/core-turn-based-game/Turn';
export interface IExpiry extends ITurn {
  increment(): number;
}
export declare class Expiry extends Turn implements IExpiry {
  increment(): number;
}
export default Expiry;
