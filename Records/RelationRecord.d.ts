import { Interaction, IInteraction } from '../Interaction';
export interface IRelationRecord extends IInteraction {
  value(): number;
}
/**
 * A value kept about players (`AttitudeRecord`, `ReputationRecord`, `ReputationCreditRecord`), stored in the
 *  `InteractionRegistry` so it's saved with the rest of the diplomacy. It's a record, not something that happened
 *  between the players: a reader that takes any interaction between two players as a sign they've met must skip
 *  these (`interaction instanceof RelationRecord`).
 */
export declare abstract class RelationRecord
  extends Interaction
  implements IRelationRecord
{
  abstract value(): number;
}
export default RelationRecord;
