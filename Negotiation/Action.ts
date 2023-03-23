import { Interaction, IInteraction } from '../Interaction';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';

export interface IAction extends IInteraction {
  by(): Player;
  for(): Player[];
  negotiation(): Negotiation;
}

export class Action extends Interaction implements IAction {
  #by: Player;
  #negotiation: Negotiation;

  constructor(
    by: Player,
    negotiation: Negotiation,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(...negotiation.players(), ruleRegistry);

    this.#by = by;
    this.#negotiation = negotiation;

    this.addKey('by', 'for', 'negotiation');
  }

  by(): Player {
    return this.#by;
  }

  for(): Player[] {
    return this.players().filter((player) => player !== this.#by);
  }

  negotiation(): Negotiation {
    return this.#negotiation;
  }
}

export default Action;
