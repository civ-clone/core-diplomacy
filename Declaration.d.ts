import { Interaction, IInteraction } from './Interaction';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Expiry from './Expiry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
export interface IDeclaration extends IInteraction {
  active(): boolean;
  expire(): void;
  expired(): boolean;
  expiry(): Expiry;
}
export declare class Declaration extends Interaction implements IDeclaration {
  #private;
  constructor(...args: (Player | Expiry | RuleRegistry | Turn)[]);
  active(): boolean;
  expire(): void;
  expired(): boolean;
  expiry(): Expiry;
}
export default Declaration;
