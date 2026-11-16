import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

/**
 * `player`'s reputation changed from `from` to `to`, for `reason`, which is whatever the rule set that changed it
 *  passed.
 */
export class ReputationChanged extends Rule<
  [player: Player, from: number, to: number, reason: string | undefined]
> {}

export default ReputationChanged;
