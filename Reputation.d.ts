import { Bounds } from './Bounds';
import { InteractionRegistry } from './InteractionRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Player from '@civ-clone/core-player/Player';
export interface ReputationOptions extends Bounds {
  initial?: number;
}
/**
 * Each player's reputation, and the credit each other player gives them against it. What the numbers mean is the rule
 *  set's: the range of a reputation is `options`, and with none given any number is kept. A credit is kept as it's
 *  given, unclamped and unannounced, and is 0 until one is.
 *
 * The values are `ReputationRecord`s and `ReputationCreditRecord`s in the `InteractionRegistry`, made the first time
 *  one is set, so they're saved with the rest of the diplomacy and a game that never sets one has none. Each change to
 *  a reputation is announced with a `ReputationChanged` rule.
 */
export declare class Reputation {
  private _interactionRegistry;
  private _options;
  private _ruleRegistry;
  private _turn;
  constructor(
    interactionRegistry?: InteractionRegistry,
    ruleRegistry?: RuleRegistry,
    turn?: Turn,
    options?: ReputationOptions
  );
  /**
   * Changes `player`'s reputation by `delta`, and answers the value kept.
   */
  adjust(player: Player, delta: number, reason?: string): number;
  /**
   * The credit `observer` gives `player` against their reputation: 0 until one is set.
   */
  credit(observer: Player, player: Player): number;
  /**
   * `player`'s reputation: `initial` until one is set.
   */
  get(player: Player): number;
  /**
   * Sets `player`'s reputation, kept within the range, and answers the value kept.
   */
  set(player: Player, value: number, reason?: string): number;
  /**
   * Sets the credit `observer` gives `player` against their reputation. A credit is kept as it's given, outside the
   *  reputation's range, and isn't announced: what limits it (the original keeps it between 0 and the reputation) is
   *  the rule set's.
   */
  setCredit(observer: Player, player: Player, value: number): void;
  private creditRecord;
  private record;
}
export default Reputation;
