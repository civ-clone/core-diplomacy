import { Interaction, IInteraction } from './Interaction';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Expiry from './Expiry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
export interface IDeclaration extends IInteraction {
  active(): boolean;
  expire(by?: Player | null): void;
  expired(): boolean;
  expiry(): Expiry;
}
export declare class Declaration extends Interaction implements IDeclaration {
  private _expiry;
  constructor(...args: (Player | Expiry | RuleRegistry | Turn)[]);
  active(): boolean;
  /**
   * Ends the declaration. `by` is the player who ended it, if one did, for the
   * `Expired` rules to say so. It isn't kept: once it has been announced, a
   * declaration only needs to know that it ended, and when.
   */
  expire(by?: Player | null): void;
  expired(): boolean;
  expiry(): Expiry;
}
export default Declaration;
