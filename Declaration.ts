import { Interaction, IInteraction } from './Interaction';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Expired from './Rules/Declaration/Expired';
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
  private _expiry: Expiry = new Never();

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
        this._expiry = arg;
      }

      if (arg instanceof Turn) {
        this._turn = arg;
      }
    });
  }

  active(): boolean {
    return !this.expiry().expired();
  }

  expire(): void {
    this._expiry = new Expiry(this._turn.value());

    this.ruleRegistry().process(Expired, this);
  }

  expired(): boolean {
    return this._expiry.expired();
  }

  expiry(): Expiry {
    return this._expiry;
  }
}

export default Declaration;
