import { Action, IAction } from '../Negotiation/Action';
import Proposal from '../Negotiation/Proposal';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';

export interface IResolution extends IAction {
  proposal(): Proposal;
}

export class Resolution extends Action implements IResolution {
  #proposal: Proposal;

  constructor(
    by: Player,
    proposal: Proposal,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(by, proposal.negotiation(), ruleRegistry);

    this.#proposal = proposal;

    this.addKey('proposal');
  }

  proposal(): Proposal {
    return this.#proposal;
  }
}

export default Resolution;
