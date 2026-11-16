import { Action, IAction } from './Action';
import { Resolution, IResolution } from '../Proposal/Resolution';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Accept from '../Proposal/Accept';
import Accepted from '../Rules/Proposal/Accepted';
import Decline from '../Proposal/Decline';
import Declined from '../Rules/Proposal/Declined';
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
  private _resolution: Resolution | null = null;

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
    return this._resolution;
  }

  async resolve(resolution: Resolution): Promise<void> {
    this._resolution = resolution;

    await Promise.all(
      this.ruleRegistry().process(Resolved, resolution, this as Proposal)
    );

    // Once its effects have happened: an accepted proposal has been carried out by the time `Accepted` is heard.
    //  `Acknowledge` and `Abstain` are neither.
    //  They're awaited as `Resolved` is, so a handler that throws or rejects rejects `resolve` too.
    if (resolution instanceof Accept) {
      const accepted = this.ruleRegistry().process(Accepted, this as Proposal);

      // Only when a rule answered, so that with none the timing is as it was.
      if (accepted.length > 0) {
        await Promise.all(accepted);
      }
    }

    if (resolution instanceof Decline) {
      const declined = this.ruleRegistry().process(Declined, this as Proposal);

      // Only when a rule answered, so that with none the timing is as it was.
      if (declined.length > 0) {
        await Promise.all(declined);
      }
    }
  }

  resolved(): boolean {
    return this._resolution !== null;
  }
}

export default Proposal;
