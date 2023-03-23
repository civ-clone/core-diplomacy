import { IProposal, Proposal } from './Proposal';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';
export interface IDialogue extends IProposal {
  key(): string;
}
export declare class Dialogue extends Proposal implements IDialogue {
  #private;
  constructor(
    by: Player,
    key: string,
    negotiation: Negotiation,
    ruleRegistry?: RuleRegistry
  );
  key(): string;
}
export default Dialogue;
