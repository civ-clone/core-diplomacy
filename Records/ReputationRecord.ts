import { IRelationRecord, RelationRecord } from './RelationRecord';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';

export interface IReputationRecord extends IRelationRecord {
  player(): Player;
  setValue(value: number): void;
  value(): number;
}

/**
 * A player's reputation, kept in the `InteractionRegistry` so that it's saved with the rest of the diplomacy. Made the
 *  first time a value is set (`Reputation`), so a game that never sets one has none.
 */
export class ReputationRecord
  extends RelationRecord
  implements IReputationRecord
{
  private _player: Player;
  private _value: number;

  constructor(player: Player, value: number, ...args: (RuleRegistry | Turn)[]) {
    super(player, ...args);

    this._player = player;
    this._value = value;

    this.addKey('player', 'value');
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

export default ReputationRecord;
