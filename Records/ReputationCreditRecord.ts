import { Interaction, IInteraction } from '../Interaction';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';

export interface IReputationCreditRecord extends IInteraction {
  observer(): Player;
  player(): Player;
  setValue(value: number): void;
  value(): number;
}

/**
 * The credit `observer` gives `player` against their reputation: one direction of one pair, kept in the
 *  `InteractionRegistry` so that it's saved with the rest of the diplomacy. Made the first time a value is set
 *  (`Reputation`), so a game that never sets one has none.
 */
export class ReputationCreditRecord
  extends Interaction
  implements IReputationCreditRecord
{
  private _observer: Player;
  private _player: Player;
  private _value: number;

  constructor(
    observer: Player,
    player: Player,
    value: number,
    ...args: (RuleRegistry | Turn)[]
  ) {
    super(observer, player, ...args);

    this._observer = observer;
    this._player = player;
    this._value = value;

    this.addKey('observer', 'player', 'value');
  }

  observer(): Player {
    return this._observer;
  }

  player(): Player {
    return this._player;
  }

  setValue(value: number): void {
    this._value = value;
  }

  value(): number {
    return this._value;
  }
}

export default ReputationCreditRecord;
