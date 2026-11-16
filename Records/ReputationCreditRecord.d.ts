import { IRelationRecord, RelationRecord } from './RelationRecord';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
export interface IReputationCreditRecord extends IRelationRecord {
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
export declare class ReputationCreditRecord
  extends RelationRecord
  implements IReputationCreditRecord
{
  private _observer;
  private _player;
  private _value;
  constructor(
    observer: Player,
    player: Player,
    value: number,
    ...args: (RuleRegistry | Turn)[]
  );
  observer(): Player;
  player(): Player;
  setValue(value: number): void;
  value(): number;
}
export default ReputationCreditRecord;
