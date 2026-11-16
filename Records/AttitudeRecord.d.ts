import { IRelationRecord, RelationRecord } from './RelationRecord';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
export interface IAttitudeRecord extends IRelationRecord {
  holder(): Player;
  setValue(value: number): void;
  toward(): Player;
  value(): number;
}
/**
 * How `holder` feels about `toward`: one direction of one pair, kept in the `InteractionRegistry` so that it's saved
 *  with the rest of the diplomacy. Made the first time a value is set (`Attitude`), so a game that never sets one has
 *  none.
 */
export declare class AttitudeRecord
  extends RelationRecord
  implements IAttitudeRecord
{
  private _holder;
  private _toward;
  private _value;
  constructor(
    holder: Player,
    toward: Player,
    value: number,
    ...args: (RuleRegistry | Turn)[]
  );
  holder(): Player;
  setValue(value: number): void;
  toward(): Player;
  value(): number;
}
export default AttitudeRecord;
