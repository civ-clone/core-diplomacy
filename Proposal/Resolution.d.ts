import { Action, IAction } from '../Negotiation/Action';
import Proposal from '../Negotiation/Proposal';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';
export interface IResolution extends IAction {
  proposal(): Proposal;
}
export declare class Resolution extends Action implements IResolution {
  #private;
  constructor(by: Player, proposal: Proposal, ruleRegistry?: RuleRegistry);
  proposal(): Proposal;
}
export default Resolution;
