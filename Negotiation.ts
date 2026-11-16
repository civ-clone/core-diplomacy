import { Interaction, IInteraction } from './Interaction';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IAction } from './Negotiation/Action';
import Initiate from './Negotiation/Initiate';
import InteractionRule from './Rules/Negotiation/Interaction';
import Player from '@civ-clone/core-player/Player';
import Step from './Rules/Negotiation/Step';
import Terminate from './Negotiation/Terminate';
import Terminated from './Negotiation/Error/Terminated';
import TerminatedRule from './Rules/Negotiation/Terminated';
import Unsupported from './Negotiation/Error/Unsupported';

export interface INegotiation extends IInteraction {
  initiator(): Player;
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}

export class Negotiation extends Interaction implements INegotiation {
  private _interactions: IAction[] = [];

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

  /**
   * The player who opened the negotiation: the first of the players it was made with. Either player may open one; the
   *  other answers. The players keep the order they were given in, in a saved game too.
   */
  initiator(): Player {
    return this.players()[0];
  }

  interactions(): IAction[] {
    return this._interactions;
  }

  lastInteraction(): IAction | null {
    if (this._interactions.length === 0) {
      return null;
    }

    return this._interactions[this._interactions.length - 1];
  }

  nextSteps(): IAction[] {
    const nextSteps = this.ruleRegistry().process(Step, this);

    if (nextSteps.length === 0) {
      nextSteps.push(
        new Terminate(this.initiator(), this, this.ruleRegistry())
      );
    }

    return nextSteps;
  }

  proceed(nextStep: IAction): void {
    if (this.terminated()) {
      throw new Terminated();
    }

    this._interactions.push(nextStep);

    this.ruleRegistry().process(
      InteractionRule,
      nextStep as IInteraction,
      this
    );

    // After the step's own rules (which, in the rule sets, register the step), and before the caller registers the
    //  negotiation itself: the drivers register it once its loop ends. `proceed` isn't async, so a `Terminated` rule
    //  that returns a promise isn't awaited; one that throws throws from `proceed`, as an `Interaction` rule does, and
    //  the negotiation has ended either way.
    if (nextStep instanceof Terminate) {
      this.ruleRegistry().process(TerminatedRule, this);
    }
  }

  terminated(): boolean {
    return this._interactions.some(
      (interaction) => interaction instanceof Terminate
    );
  }
}

export default Negotiation;
