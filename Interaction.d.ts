import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
export interface IInteraction extends IDataObject {
  isBetween(...players: Player[]): boolean;
  players(): Player[];
  when(): number;
}
export declare class Interaction extends DataObject implements IInteraction {
  #private;
  constructor(...args: (Player | RuleRegistry | Turn)[]);
  isBetween(...players: Player[]): boolean;
  players(): Player[];
  protected ruleRegistry(): RuleRegistry;
  when(): number;
}
export default Interaction;
