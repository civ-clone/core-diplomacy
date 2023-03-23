import { Interaction, IInteraction } from '../Interaction';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';
export interface IAction extends IInteraction {
  by(): Player;
  for(): Player[];
  negotiation(): Negotiation;
}
export declare class Action extends Interaction implements IAction {
  #private;
  constructor(
    by: Player,
    negotiation: Negotiation,
    ruleRegistry?: RuleRegistry
  );
  by(): Player;
  for(): Player[];
  negotiation(): Negotiation;
}
export default Action;
