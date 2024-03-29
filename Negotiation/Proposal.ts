import { Action, IAction } from './Action';
import { Resolution, IResolution } from '../Proposal/Resolution';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Step from '../Rules/Negotiation/Step';
import Resolved from '../Rules/Proposal/Resolved';
import Player from '@civ-clone/core-player/Player';

export interface IProposal extends IAction {
  choices(): IResolution[];
  resolution(): Resolution | null;
  resolve(resolution: Resolution): Promise<void>;
  resolved(): boolean;
}

export class Proposal extends Action implements IProposal {
  #resolution: Resolution | null = null;

  constructor(
    by: Player,
    negotiation: Negotiation,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(by, negotiation, ruleRegistry);

    this.addKey('resolution', 'resolved');
  }

  choices(): IResolution[] {
    return this.ruleRegistry().process(
      Step,
      this.negotiation()
    ) as IResolution[];
  }

  resolution(): Resolution | null {
    return this.#resolution;
  }

  async resolve(resolution: Resolution): Promise<void> {
    this.#resolution = resolution;

    await Promise.all(
      this.ruleRegistry().process(Resolved, resolution, this as Proposal)
    );
  }

  resolved(): boolean {
    return this.#resolution !== null;
  }
}

export default Proposal;
