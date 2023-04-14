import { Action, IAction } from './Action';
import { Resolution, IResolution } from '../Proposal/Resolution';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';
export interface IProposal extends IAction {
  choices(): IResolution[];
  resolution(): Resolution | null;
  resolve(resolution: Resolution): Promise<void>;
  resolved(): boolean;
}
export declare class Proposal extends Action implements IProposal {
  #private;
  constructor(
    by: Player,
    negotiation: Negotiation,
    ruleRegistry?: RuleRegistry
  );
  choices(): IResolution[];
  resolution(): Resolution | null;
  resolve(resolution: Resolution): Promise<void>;
  resolved(): boolean;
}
export default Proposal;
