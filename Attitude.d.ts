import { Bounds } from './Bounds';
import { InteractionRegistry } from './InteractionRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Player from '@civ-clone/core-player/Player';
export interface AttitudeOptions extends Bounds {
  initial?: number;
}
/**
 * How each player feels about each other: a number per direction of each pair, `holder` toward `toward`. What the
 *  numbers mean (whether higher is warmer or colder, and the range) is the rule set's: the range is `options`, and
 *  with none given any number is kept.
 *
 * The values are `AttitudeRecord`s in the `InteractionRegistry`, made the first time one is set, so they're saved with
 *  the rest of the diplomacy and a game that never sets one has none. Each change is announced with an
 *  `AttitudeChanged` rule.
 */
export declare class Attitude {
  private _interactionRegistry;
  private _options;
  private _ruleRegistry;
  private _turn;
  constructor(
    interactionRegistry?: InteractionRegistry,
    ruleRegistry?: RuleRegistry,
    turn?: Turn,
    options?: AttitudeOptions
  );
  /**
   * Changes `holder`'s attitude toward `toward` by `delta`, from `initial` when it has none yet, and answers the value
   *  kept.
   */
  adjust(
    holder: Player,
    toward: Player,
    delta: number,
    reason?: string
  ): number;
  /**
   * `holder`'s attitude toward `toward`, or `undefined` if it has none.
   */
  get(holder: Player, toward: Player): number | undefined;
  /**
   * Sets `holder`'s attitude toward `toward`, kept within the range, and answers the value kept.
   */
  set(holder: Player, toward: Player, value: number, reason?: string): number;
  private record;
}
export default Attitude;
