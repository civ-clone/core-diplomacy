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
export declare class ReputationRecord
  extends RelationRecord
  implements IReputationRecord
{
  private _player;
  private _value;
  constructor(player: Player, value: number, ...args: (RuleRegistry | Turn)[]);
  player(): Player;
  setValue(value: number): void;
  value(): number;
}
export default ReputationRecord;
