import { Interaction, IInteraction } from './Interaction';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import Expiry from './Expiry';
import Never from './Expiries/Never';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';

export interface IDeclaration extends IInteraction {
  active(): boolean;
  expire(): void;
  expired(): boolean;
  expiry(): Expiry;
}

export class Declaration extends Interaction implements IDeclaration {
  #expiry: Expiry = new Never();
  #turn: Turn = turnInstance;

  constructor(...args: (Player | Expiry | RuleRegistry | Turn)[]) {
    super(
      ...args.filter(
        (value): value is Player | RuleRegistry =>
          value instanceof Player || value instanceof RuleRegistry
      )
    );

    this.addKey('expired', 'expiry');

    args.forEach((arg) => {
      if (arg instanceof Expiry) {
        this.#expiry = arg;
      }

      if (arg instanceof Turn) {
        this.#turn = arg;
      }
    });
  }

  active(): boolean {
    return !this.expiry().expired();
  }

  expire(): void {
    this.#expiry = new Expiry(this.#turn.value());
  }

  expired(): boolean {
    return this.#expiry.expired();
  }

  expiry(): Expiry {
    return this.#expiry;
  }
}

export default Declaration;
