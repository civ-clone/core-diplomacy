import { IProposal, Proposal } from './Proposal';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';

export interface IDialogue extends IProposal {
  key(): string;
}

export class Dialogue extends Proposal implements IDialogue {
  #key: string;

  constructor(
    by: Player,
    key: string,
    negotiation: Negotiation,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(by, negotiation, ruleRegistry);

    this.#key = key;

    this.addKey('key');
  }

  key(): string {
    return this.#key;
  }
}

export default Dialogue;
