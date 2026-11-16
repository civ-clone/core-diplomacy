import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
/**
 * `holder`'s attitude toward `toward` changed from `from` (`undefined` when it had none) to `to`, for `reason`, which
 *  is whatever the rule set that changed it passed.
 */
export declare class AttitudeChanged extends Rule<
  [
    holder: Player,
    toward: Player,
    from: number | undefined,
    to: number,
    reason: string | undefined
  ]
> {}
export default AttitudeChanged;
