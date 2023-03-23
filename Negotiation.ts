import { Interaction, IInteraction } from './Interaction';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IAction } from './Negotiation/Action';
import Initiate from './Negotiation/Initiate';
import InteractionRule from './Rules/Negotiation/Interaction';
import Player from '@civ-clone/core-player/Player';
import Step from './Rules/Negotiation/Step';
import Terminate from './Negotiation/Terminate';
import Terminated from './Negotiation/Error/Terminated';
import Unsupported from './Negotiation/Error/Unsupported';

export interface INegotiation extends IInteraction {
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}

export class Negotiation extends Interaction implements INegotiation {
  #interactions: IAction[] = [];

  constructor(...args: (Player | RuleRegistry)[]) {
    if (
      args.filter((arg): arg is Player => arg instanceof Player).length !== 2
    ) {
      throw new Unsupported();
    }

    super(...args);

    const [initiator] = args.filter(
      (arg): arg is Player => arg instanceof Player
    );

    if (!initiator) {
      throw new Unsupported('Not enough `Player`s for `Negotiation`.');
    }

    this.addKey('interactions', 'lastInteraction', 'terminated');
  }

  interactions(): IAction[] {
    return this.#interactions;
  }

  lastInteraction(): IAction | null {
    if (this.#interactions.length === 0) {
      return null;
    }

    return this.#interactions[this.#interactions.length - 1];
  }

  nextSteps(): IAction[] {
    const nextSteps = this.ruleRegistry().process(Step, this);

    if (nextSteps.length === 0) {
      nextSteps.push(
        new Terminate(this.players()[0], this, this.ruleRegistry())
      );
    }

    return nextSteps;
  }

  proceed(nextStep: IAction): void {
    if (this.terminated()) {
      throw new Terminated();
    }

    this.#interactions.push(nextStep);

    this.ruleRegistry().process(
      InteractionRule,
      nextStep as IInteraction,
      this
    );
  }

  terminated(): boolean {
    return this.#interactions.some(
      (interaction) => interaction instanceof Terminate
    );
  }
}

export default Negotiation;
